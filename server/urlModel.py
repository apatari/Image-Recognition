import face_recognition
from PIL import Image
import requests
import os

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
    #     and add a name key/value to all coordinates, with null for unknowns

    def getNames(self):
        return {"coords": self.getCoordinates()}

    

    