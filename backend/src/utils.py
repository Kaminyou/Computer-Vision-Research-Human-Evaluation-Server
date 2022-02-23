import uuid


def get_primary_key():
    return str(uuid.uuid4())

def get_raw_filename(hashed_name, hashing_table):
    return hashing_table[hashed_name]
