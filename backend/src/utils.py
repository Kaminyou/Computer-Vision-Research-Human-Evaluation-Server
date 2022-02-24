import hashlib
import uuid


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
