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

