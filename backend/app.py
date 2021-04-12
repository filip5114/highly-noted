import datetime
import os
import logging
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin

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

class Todo(db.Document):
    title = db.StringField(max_length=60)
    text = db.StringField()
    done = db.BooleanField(default=False)
    pub_date = db.DateTimeField(default=datetime.datetime.now)

@app.route("/api")
@cross_origin(origins='http://localhost:3000')
def index():
    Todo.objects().delete()
    Todo(title="Simple todo A", text="12345678910").save()
    Todo(title="Simple todo B", text="12345678910").save()
    Todo.objects(title__contains="B").update(set__text="Hello world")
    todos = Todo.objects().to_json()
    return Response(todos, mimetype="application/json", status=200)

@app.route("/api/v1/todo", methods=['GET', 'POST'])
@cross_origin(origins='http://localhost:3000')
def todo():
    if request.method == 'POST':
        request_body = request.get_json()
        print(request_body)
        Todo(title=request_body.get('title')[0], text=request_body.get('value')[0]).save()
        todos = Todo.objects().to_json()
        return Response(todos, mimetype="application/json", status=200)
    elif request.method == 'GET':
        return Response('get works', status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)