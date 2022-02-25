import hashlib
import sqlite3
import uuid
from pathlib import Path


def check_db_exist_or_init(db_path='evaluation.db'):
    db_path = Path(db_path)
    if not db_path.is_file():
        init_database(db_path)

def init_database(db_path='evaluation.db'):
    conn = sqlite3.connect(db_path)
    print ("Open DB")
    c = conn.cursor()
    c.execute('''CREATE TABLE EVALUATION
        (ID CHAR(37) PRIMARY KEY  NOT NULL,
        SUBMISSION_DATE TIMESTAMP NOT NULL,
        ACCOUNT         TEXT  NOT NULL,
        TASK            TEXT  NOT NULL,
        CHALLENGE_ID     TEXT  NOT NULL,
        AVAILABLE_CHOICES TEXT  NOT NULL,
        CHOICES         TEXT  NOT NULL,
        DURATION INT NOT NULL);''')
    print("CREATE DB")
    conn.commit()
    conn.close()

def get_primary_key():
    return str(uuid.uuid4())

def get_raw_filename(hashed_name, hashing_table):
    return hashing_table[hashed_name]

def combine_list_string(list):
    return '||'.join(list)

def get_sha256_id(string, salt = "bestpaper", length = 12):
    string = string + salt
    hash_id = hashlib.sha256(str.encode(string)).hexdigest()
    return hash_id[:length]
