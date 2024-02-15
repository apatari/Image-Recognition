#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
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


api.add_resource(ImageScan, '/api/image_scan')

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

