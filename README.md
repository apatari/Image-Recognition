# Image Recognition Web App

This app came about as a result of the fun I had tinkering with the [face-recognition library](https://pypi.org/project/face-recognition/) for Python.  It's a wonderful library and I suggest you give it a try if you like doing things with Python.  The app lets users create a library of known faces, using URLs pointing to images of those faces to identify them.  Users can then enter the URL of any image and the app will process the image, identify the faces, and provide names for any known faces.  

![App Screenshot](https://github.com/apatari/Image-Recognition/assets/108021977/7402e38f-a3e3-4f28-8123-3b25adbc39be)


## Setup

You are welcome to fork, clone, and modify this repo for any purpose.  In order to run it on your own local machine, you'll need to cd to the project directory and run a few commands in the terminal:
```bash
pipenv install
```
```bash
pipenv shell
```

Stay in the server directory and run:

```bash
flask db init
```
```bash
flask db migrate -m'create tables'
```
```bash
flask db upgrade
```
```bash
python seed.py
```

To start a local server:
```bash
python app.py
```
From there, open a new terminal in the main directory and run:
```bash
npm install --prefix client
```
You should see a working version running on your machine!

---

## Acknowledgments

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [SQLAlchemy](https://www.sqlalchemy.org/). It uses [Bootstrap React](https://react-bootstrap.netlify.app/) and [Bootswatch](https://bootswatch.com/) for styling, and the [face-recognition](https://pypi.org/project/face-recognition//) and [Pillow](https://pillow.readthedocs.io/en/stable/) libraries for Python.  Thank you to the folks who created and maintain those resources.
