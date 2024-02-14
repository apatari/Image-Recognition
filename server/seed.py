#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        User.query.delete()

        print("Adding...")

        u1 = User(username="test")
        u1.password_hash="bigPuppy"

        db.session.add(u1)
        db.session.commit()
