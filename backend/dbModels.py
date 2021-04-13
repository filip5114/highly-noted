import datetime

from flask_mongoengine import MongoEngine

db = MongoEngine()

class Note(db.Document):
    title = db.StringField(max_length=100)
    text = db.StringField()
    pub_date = db.DateTimeField(default=datetime.datetime.now)

