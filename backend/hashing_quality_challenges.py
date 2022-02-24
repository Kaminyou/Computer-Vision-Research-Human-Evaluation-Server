import argparse
import json

from src.utils import get_sha256_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('quality_challenges', help='input json file of quality challenges which contains raw filenames')
    parser.add_argument('hashed_quality_challenges', help='output json file of quality challenges which contains hashed filenames')
    args = parser.parse_args()

    with open(args.quality_challenges, 'r') as f:
        quality_challenges = json.load(f)
    
    for id, challenges in quality_challenges.items():
        for k, v in challenges.items():
            quality_challenges[id][k] = get_sha256_id(v)

    with open(args.hashed_quality_challenges, 'w') as f:
        json.dump(quality_challenges, f)
