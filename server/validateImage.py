import requests
import face_recognition
import os

class Validate:
    def imageUrl(url):
        try:
            data = requests.get(url).content
            
            f = open('test.jpg', 'wb')
            f.write(data)
            f.close()

            image_path = "test.jpg"
            image = face_recognition.load_image_file(image_path)
            os.remove('test.jpg')
            faces =  len(face_recognition.face_locations(image))
        
            return faces


        except:
            return -1