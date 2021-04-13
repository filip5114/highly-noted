import datetime
import os
import logging
import markdown
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
from dbModels import Note

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': os.getenv('MONGODB_HOST'),
    'username': os.getenv('MONGODB_USERNAME'),
    'password': os.getenv('MONGODB_PASSWORD'),
    'db': 'webapp'
}
app.config['CORS_HEADERS']= 'Content-Type'

db = MongoEngine()
db.init_app(app)

@app.route("/api", methods=['GET'])
@cross_origin(origins='http://localhost:3000')
def index():
    notes = Note.objects().to_json()
    return Response(notes, mimetype="application/json", status=200)

@app.route("/api/v1/note", methods=['GET', 'POST'])
@cross_origin(origins='http://localhost:3000')
def todo():
    if request.method == 'POST':
        request_body = request.get_json()
        Note(title=request_body.get('title')[0], text=request_body.get('value')[0]).save()
        notes = Note.objects().to_json()
        return Response(notes, mimetype="application/json", status=200)
    elif request.method == 'GET':
        return Response('get works', status=200)

@app.route("/api/v1/note/delete", methods=['GET', 'POST'])
@cross_origin(origins='http://localhost:3000')
def delete_todo():
    if request.method == 'POST':
        request_body = request.get_json()
        Note.objects.get(id=request_body.get('id')).delete()
        notes = Note.objects().to_json()
        return Response(notes, mimetype="application/json", status=200)
    elif request.method == 'GET':
        return Response('get works', status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)