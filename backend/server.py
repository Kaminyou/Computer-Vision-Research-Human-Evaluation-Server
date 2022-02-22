import os
import sqlite3

from flask import Flask, Response, request, send_from_directory
from flask_cors import CORS

from src.utils import get_data_mapping_dict, get_primary_key

CONFIGS = {
    "ENV": "development",
    "DEBUG": True
}

IMAGE_DICT = get_data_mapping_dict()

app = Flask(__name__)
app.config.update(CONFIGS)

CORS(app)

@app.route("/")
def hello():
    return "Welcome to human evaluation image server"

@app.route('/api/v1/images/<filename>', methods = ["GET", "POST"])
def get_image(filename):
    try:
        image_path = IMAGE_DICT[filename]
        image_name = os.path.basename(image_path)
        dir_name = os.path.dirname(image_path) 
        return send_from_directory(directory=dir_name, path=image_name)
        
    except:
        return Response(
            "{'massenge':'do not exist'}", 
            status=400, 
            mimetype='application/json'
        )

@app.route('/api/v1/record', methods = ["POST"])
def record():
    data = request.get_json()
    account = data['account']
    task = data['task']
    challenge_id = data['challengeID']
    choice = data['choice']

    try:
        uuid = get_primary_key()
        conn = sqlite3.connect('evaluation.db')
        c = conn.cursor()
        c.execute(f"INSERT INTO EVALUATION (ID,ACCOUNT,TASK,CHALLENGEID,CHOICE) \
                    VALUES ('{uuid}', '{account}', '{task}', '{challenge_id}', '{choice}' )")
        conn.commit()
        c.close()
        return Response(
            "{'massenge':'received'}", 
            status=200, 
            mimetype='application/json'
        )

    except Exception as e:
        print(e)
        return Response(
            "{'massenge':'error'}", 
            status=500, 
            mimetype='application/json'
        )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9292)
