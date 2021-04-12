import datetime
import os
import logging
 
from flask import Flask, Response, request
from flask_mongoengine import MongoEngine
from flask_cors import CORS, cross_origin
from dbModels import Todo

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

@app.route("/api/v1/todo/delete", methods=['GET', 'POST'])
@cross_origin(origins='http://localhost:3000')
def delete_todo():
    if request.method == 'POST':
        request_body = request.get_json()
        Todo.objects.get(id=request_body.get('id')).delete()
        todos = Todo.objects().to_json()
        return Response(todos, mimetype="application/json", status=200)
    elif request.method == 'GET':
        return Response('get works', status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)