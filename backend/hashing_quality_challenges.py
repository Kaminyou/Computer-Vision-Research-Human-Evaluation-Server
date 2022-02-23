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
    parser.add_argument('quality_challenges', help='json file of quality challenges which contains raw filenames')
    parser.add_argument('hashed_quality_challenges', help='json file of quality challenges which contains hashed filenames')
    args = parser.parse_args()

    with open(args.quality_challenges, 'r') as f:
        quality_challenges = json.load(f)
    
    for id, challenges in quality_challenges.items():
        for k, v in challenges.items():
            quality_challenges[id][k] = get_sha256_id(v)

    with open(args.hashed_quality_challenges, 'w') as f:
        json.dump(quality_challenges, f)
