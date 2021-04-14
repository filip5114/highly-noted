import datetime
import os
import logging
import markdown
 
from flask import Flask, Response, request, json
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy


logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@db:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

from dbModels import Note, db

@app.route("/api", methods=['GET'])
@cross_origin(origins='http://localhost:3000')
def index():
    notes = json.dumps([note.to_dict() for note in Note.query.all()])
    return Response(notes, mimetype="application/json", status=200)

@app.route("/api/v1/note/add", methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def add_note():
    request_body = request.get_json()
    db.session.add(Note(title=request_body.get('title')[0], text=request_body.get('value')[0]))
    db.session.commit()
    notes = json.dumps([note.to_dict() for note in Note.query.all()])
    return Response(notes, mimetype="application/json", status=200)

@app.route("/api/v1/note/delete", methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def delete_note():
    request_body = request.get_json()
    id = request_body.get('id')
    Note.query.filter_by(id=id).delete()
    db.session.commit()
    notes = json.dumps([note.to_dict() for note in Note.query.all()])
    return Response(notes, mimetype="application/json", status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)