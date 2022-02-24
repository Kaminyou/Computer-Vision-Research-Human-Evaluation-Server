import argparse
import glob
import json
from pathlib import Path

from src.utils import get_sha256_id

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('filenames_list', help='input list of filenames')
    parser.add_argument('quality_challenges', help='output json file of quality challenges which contains raw filenames')
    parser.add_argument('hashed_quality_challenges', help='output json file of quality challenges which contains hashed filenames')
    args = parser.parse_args()

    count = 1
    filename_dir_to_id_dict = {}
    quality_challenges = {}
    hashed_quality_challenges = {}
    with open(args.filenames_list, "r") as f:
        for line in f:
            filename = line.rstrip('\n')
            filename_dir = str(Path(filename).parent)
            filename_stem = str(Path(filename).stem)
            if filename_dir not in filename_dir_to_id_dict:
                filename_dir_to_id_dict[filename_dir] = f'{count:04}'
                count = count + 1
            id = filename_dir_to_id_dict[filename_dir]
            if id not in quality_challenges:
                quality_challenges[id] = {}
            if id not in hashed_quality_challenges:
                hashed_quality_challenges[id] = {}
            if 'origin' in filename_stem:
                quality_challenges[id]["origin"] = filename
                hashed_quality_challenges[id]["origin"] = get_sha256_id(filename)
            elif 'reference' in filename_stem:
                quality_challenges[id]["reference"] = filename
                hashed_quality_challenges[id]["reference"] = get_sha256_id(filename)
            elif 'combined_in' in filename_stem:
                quality_challenges[id]["IN"] = filename
                hashed_quality_challenges[id]["IN"] = get_sha256_id(filename)
            elif 'combined_tin' in filename_stem:
                quality_challenges[id]["TIN"] = filename
                hashed_quality_challenges[id]["TIN"] = get_sha256_id(filename)
            elif 'combined_kin' in filename_stem:
                quality_challenges[id]["KIN"] = filename
                hashed_quality_challenges[id]["KIN"] = get_sha256_id(filename)
            else:
                print(f"Weird filename: {filename}")

    with open(args.quality_challenges, 'w') as f:
        json.dump(quality_challenges, f)

    with open(args.hashed_quality_challenges, 'w') as f:
        json.dump(hashed_quality_challenges, f)

    