import face_recognition
from PIL import Image
import requests
import os
from models import User
from config import app

# I want to send my backend an image url and a user name, then return an array
#  containing dicts with all of the coordinates for faces in the image, along with
#  either a name or null

# functions needed:

# * First take the photo url and return all of the coordinates for faces


class Url:
    def __init__(self, url):
        self.url = url


    def getCoordinates(self):
        data = requests.get(self.url).content

        f = open('img.jpg', 'wb')
        f.write(data)
        f.close()

        image_path = "img.jpg"

        image = face_recognition.load_image_file(image_path)

        os.remove('img.jpg')

        return face_recognition.face_locations(image)


    # * Then take the coordinates, create a series of face images, look for matches in db
    #     and add a name key/value to all coordinates, with false for unknowns

    def getNames(self, user_id, tolerance=0.6):

        res = []

        with app.app_context():

            #get the coordinates of the faces 
            coordinates = self.getCoordinates()

            #get the user's image objects from db
            image_objects = User.query.filter_by(id=user_id).first().images
            em_encodings =[]
            for im_ob in image_objects:
                    
                    dbData = requests.get(im_ob.url).content
                    f = open('dbImage.jpg', 'wb')
                    f.write(dbData)
                    f.close()
                    em_encodings.append({"enc":face_recognition.load_image_file('dbImage.jpg'), "name": im_ob.name} ) 

            #put the image from the target url into an image file
            bigPictureData = requests.get(self.url).content
            f = open('bigPicture.jpg', 'wb')
            f.write(bigPictureData)
            f.close()


            # iterate through each face,  as defined by the coordinates 
            for index, coordinate in enumerate(coordinates):
                top = coordinate[0]
                right = coordinate[1]
                bottom = coordinate[2]
                left = coordinate[3]

                foundMatch = False

                #temporarily save an image of that face
                with Image.open('bigPicture.jpg') as im:
                    im.crop((left, top, right, bottom)).save('target.jpg')

                #generate a dict of the face encodings so this doesn't need to be repeated
                unknown_image = face_recognition.load_image_file('target.jpg')
                
   
                for encoding in em_encodings:                 

                    if face_recognition.face_encodings(encoding["enc"]) and face_recognition.face_encodings(unknown_image):

                        known_enc = face_recognition.face_encodings(encoding["enc"])[0]
                        unknown_enc = face_recognition.face_encodings(unknown_image)[0]

                        results = face_recognition.compare_faces([known_enc], unknown_enc, tolerance=tolerance)

                        if results[0]:
                            res.append({"name": encoding['name'], "coordinates": coordinate})
                            foundMatch = True
                            break
                            
                    
                if not foundMatch:
                    res.append({"name": "Unknown", "coordinates": coordinate})

            # delete bigpicture and target?
            os.remove('bigPicture.jpg')
            os.remove('dbImage.jpg')
            os.remove('target.jpg')
            return res



                

    

    