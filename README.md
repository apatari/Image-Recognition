# Image Recognition Web App

This app came about as a result of the fun I had tinkering with the [face-recognition library](https://pypi.org/project/face-recognition/) for Python.  It's a wonderful library and I suggest you give it a try if you like doing things with Python.  The app lets users create a library of known faces, using URLs pointing to images of those faces to identify them.  Users can then enter the URL of any image and the app will process the image, identify the faces, and provide names for any known faces.  


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