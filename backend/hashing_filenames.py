import argparse
import hashlib
import json


def get_sha256_id(string, salt = "bestpaper", length = 12):
    string = string + salt
    hash_id = hashlib.sha256(str.encode(string)).hexdigest()
    return hash_id[:length]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('filenames_list', help='list of filenames')
    parser.add_argument('hashing_table', help='hashing table')
    args = parser.parse_args()

    hashing_table = {}
    with open(args.filenames_list, "r") as f:
        for line in f:
            filename = line.rstrip('\n')
            hashed_filename = get_sha256_id(filename)
            hashing_table[hashed_filename] = filename

    with open(args.hashing_table, 'w') as f:
        json.dump(hashing_table, f)
