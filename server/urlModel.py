import face_recognition
from PIL import Image
import requests
import os
from models import User
from app import app

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

    def getNames(self, user_id):

        with app.app_context():

            #get the coordinates of the faces 
            coordinates = self.getCoordinates()

            #get the user's image objects from db
            image_objects = User.query.filter_by(id=user_id).first()

            #put the image from the target url into an image file
            bigPictureData = requests.get(self.url).content
            f = open('bigPicture.jpg', 'wb')
            f.write(bigPictureData)
            f.close()



            for index, coordinate in enumerate(coordinates):
                top = coordinate[0]
                right = coordinate[1]
                bottom = coordinate[2]
                left = coordinate[3]

                with Image.open('bigPicture.jpg') as im:
                    im.crop((left, top, right, bottom)).show()




                # f = open(f'target{str(index)}.jpg', 'wb')
                # f.write(targetData)
                # f.close

                # for im_ob in image_objects:


                # programatically create and name an image file for each one
                # iterate through all of the user's photos, if any one matches, append the dict with the name to the result
                #   else append the dict with false

    

    