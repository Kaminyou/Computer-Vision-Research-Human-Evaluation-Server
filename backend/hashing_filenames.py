import argparse
import json

from src.utils import get_sha256_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('filenames_list', help='input list of filenames')
    parser.add_argument('hashing_table', help='output hashing table')
    args = parser.parse_args()

    hashing_table = {}
    with open(args.filenames_list, "r") as f:
        for line in f:
            filename = line.rstrip('\n')
            hashed_filename = get_sha256_id(filename)
            hashing_table[hashed_filename] = filename

    with open(args.hashing_table, 'w') as f:
        json.dump(hashing_table, f, indent='\t')
