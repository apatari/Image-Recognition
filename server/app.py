#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Image
from urlModel import Url


# Views go here!

class ImageScan(Resource):
    def post(self):

        url = request.get_json()['url']

        # get the userid from session
        data = Url(url=url).getNames(1)

        return {"data":data}, 200
    
class Login(Resource):

    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": ["Invalid username and/or password"]}, 401
        
class Logout(Resource):
    
    def delete(self):

        user = User.query.filter_by(id = session.get('user_id')).first()

        if user:
            session["user_id"] = None
            return {}, 200
        else:
            return{"errors": "Error: cannot log out, you are not logged in"}, 401
        

class CheckSession(Resource):

    def get(self):

        user = User.query.filter_by(id = session.get('user_id')).first()

        if user:
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": "User not logged in"}, 401

class Signup(Resource):

    def post(self):

        json = request.get_json()

        try:
            user = User(username=json.get('username'))
            user.password_hash = json.get('password')
            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201
        
        except Exception as err:
            return {"errors": [str(err)]}, 422
        
class ImageIndex(Resource):

    def get(self):

        user_id = session.get('user_id')

        if not user_id:
            return {"errors": "user not logged in"}, 401

        images = [image.to_dict() for image in Image.query.filter_by(user_id=user_id).all()]

        return images, 200
    
    def post(self):

        json = request.get_json()
        user_id = session.get('user_id')

        if not user_id:
            return {"errors": "user not logged in"}, 422

        try:
            name = json['name']
            url = json['url']
            img = Image(user_id=user_id, name=name, url=url)
            db.session.add(img)
            db.session.commit()

            return img.to_dict(), 201
        except Exception as err:
            return {"errors": [str(err)]}, 422
        
class ImageByID(Resource):
    def delete(self, id):

        image = Image.query.filter_by(id=id).first()

        if not image:
            return {"error": "That image doesn't exist"}, 404
        else:
            db.session.delete(image)
            db.session.commit()

            return {}, 204
        
    def patch(self, id):

        image = Image.query.filter_by(id=id).first()
        json = request.get_json()

        if not image:
            return {"error": "Image not found"}, 404
        try:
            image.name = json['name']
            image.url = json['url']

            db.session.add(image)
            db.session.commit()

            return image.to_dict(), 201
        except Exception as err:
            return {"errors": [str(err)]}, 422

        


api.add_resource(ImageByID, '/api/images/<int:id>')
api.add_resource(ImageIndex, '/api/images')
api.add_resource(ImageScan, '/api/image_scan')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(Signup, '/api/signup')

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

