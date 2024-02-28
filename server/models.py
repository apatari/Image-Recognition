from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from validateImage import Validate

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Integer, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    images = db.relationship('Image', back_populates='user', cascade='all')

    serialize_rules = ('-images.user',)

    @validates('username')
    def validate_username(self, key, name):
        if not name or not 0 < len(name) <= 20:
            raise ValueError("Name ,ust be 1-20 characters")
        if User.query.filter_by(username=name).first():
            raise ValueError("Sorry, that username is not available")
        return name
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 4:
            raise ValueError("Passwords must be 4 or more characters")
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User {self.username}, ID: {self.id}'
    
class Image(db.Model, SerializerMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)

    user = db.relationship('User', back_populates='images')

    serialize_only = ('id', 'user_id', 'name', 'url')

    @validates('url')
    def validate_url(self, key, url):
        validation_result = Validate.imageUrl(url=url)
        if not validation_result:
            raise ValueError("Couldn't process that URL")
        elif validation_result == 0:
            raise ValueError("Face not detected in image")
        elif validation_result > 1:
            raise ValueError("Multiple faces detected")
        else:
            return url

    def __repr__(self) -> str:
        return f'Image {self.id}: {self.name}'

    