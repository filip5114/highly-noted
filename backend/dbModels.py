from app import app
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(app)

class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    text = db.Column(db.String())

    def __init__(self, title, text):
        self.title = title
        self.text = text
    
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}