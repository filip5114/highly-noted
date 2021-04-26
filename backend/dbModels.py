# from app import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    content = db.Column(db.String())

    def __init__(self, content):
        self.content = content
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}