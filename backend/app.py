import datetime
import os
import logging
import markdown
 
from flask import Flask, Response, request, json
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from dbModels import Note, db


logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@db:{os.getenv('POSTGRES_PORT')}/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route("/api", methods=['GET'])
@cross_origin(origins='http://localhost:3000')
def index():
    notes = json.dumps([note.to_dict() for note in Note.query.all()])
    return Response(notes, mimetype="application/json", status=200)

@app.route("/api/v1/note/add", methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def add_note():
    request_body = request.get_json()
    text = request_body.get('value')
    title = '# ' + text.split('\n')[0]
    text = '\n'.join(text.split('\n')[1:])
    db.session.add(Note(title=title, text=text))
    db.session.commit()
    notes = json.dumps([note.to_dict() for note in Note.query.all()])
    return Response(notes, mimetype="application/json", status=200)

@app.route("/api/v1/note/edit", methods=['POST'])
@cross_origin(origins='http://localhost:3000')
def edit_note():
    request_body = request.get_json()
    text = request_body.get('text')
    title = text.split('\n')[0]
    text = '\n'.join(text.split('\n')[1:])
    Note.query.filter_by(id=request_body.get('id')).update(dict(text=text, title=title))
    db.session.commit()
    return Response({'done'}, mimetype="application/json", status=200)

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