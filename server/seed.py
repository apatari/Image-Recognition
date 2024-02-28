#!/usr/bin/env python3

# Standard library imports


# Remote library imports


# Local imports
from app import app
from models import db, User, Image

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        User.query.delete()
        Image.query.delete()

        print("Adding...")

        u1 = User(username="test")
        u1.password_hash="bigPuppy"
        u2 = User(username="test2")
        u2.password_hash="bigPuppy"

        db.session.add(u1)
        db.session.add(u2)
        db.session.commit()

        images = [
            Image(name='Harry', user_id='1', url='https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg'),
            Image(name='Harry', user_id='2', url='https://upload.wikimedia.org/wikipedia/en/d/d7/Harry_Potter_character_poster.jpg'),
            Image(name='Hermoine', user_id='1', url='https://i0.wp.com/the-art-of-autism.com/wp-content/uploads/2022/12/Hermione-Granger.jpg?fit=450%2C600&ssl=1'),
            Image(name='Ron', user_id='1', url='https://upload.wikimedia.org/wikipedia/en/5/5e/Ron_Weasley_poster.jpg'),
            Image(name='Snape', user_id='1', url='https://upload.wikimedia.org/wikipedia/en/b/b9/Ootp076.jpg'),
        ]
        for image in images:
            db.session.add(image)
        
        db.session.commit()


