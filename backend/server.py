import datetime
import json
import os
import sqlite3

from flask import Flask, Response, jsonify, request, send_from_directory
from flask_cors import CORS

from src.utils import combine_list_string, get_primary_key, get_raw_filename

CONFIGS = {
    "ENV": "development",
    "DEBUG": True
}

with open('./data/hashing_table.json', 'r') as f:
    HASING_TABLE = json.load(f)

with open('./data/hashed_quality_challenges.json', 'r') as f:
    QUALITY_CHALLENGES = json.load(f)

app = Flask(__name__)
app.config.update(CONFIGS)

CORS(app)

@app.route("/")
def hello():
    return "Welcome to human evaluation image server"

@app.route('/api/v1/quality_challenges', methods = ['GET'])
def get_quality_challenges():
    return jsonify({"data": QUALITY_CHALLENGES})

@app.route('/api/v1/images/<filename>', methods = ["GET"])
def get_image(filename):
    try:
        image_path = HASING_TABLE[filename]
        image_name = os.path.basename(image_path)
        dir_name = os.path.dirname(image_path) 
        return send_from_directory(directory=dir_name, path=image_name)
        
    except Exception as E:
        print(E)
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
    available_choices = combine_list_string(data['availableChoices'])
    choices = combine_list_string(data['choices'])
    #print(account, task, challenge_id, available_choices, choices)

    try:
        uuid = get_primary_key()
        conn = sqlite3.connect('evaluation.db')
        current_time = datetime.datetime.now()
        c = conn.cursor()
        c.execute(f"INSERT INTO EVALUATION (ID,SUBMISSION_DATE,ACCOUNT,TASK,CHALLENGE_ID,AVAILABLE_CHOICES,CHOICES) \
                    VALUES ('{uuid}', '{current_time}', '{account}', '{task}', '{challenge_id}', '{available_choices}', '{choices}' )")
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
    app.run(host='0.0.0.0', port=2222)
