import argparse
import itertools
import json
import random

from src.utils import get_sha256_id


def get_random_pairs(list_a, list_b, num_pair=5):
    return random.sample(list(itertools.product(list_a,list_b)), num_pair)

def get_fidelity_challenges_pairs(datasets, R=5):
    reference_images = []
    IN_images = []
    TIN_images = []
    KIN_images = []

    for challenges in quality_challenges.values():
        flag = False
        for dataset in datasets:
            if dataset in challenges["reference"]:
                flag = True
                break
        if flag:
            reference_images.append(challenges["reference"])
            IN_images.append(challenges["IN"])
            TIN_images.append(challenges["TIN"])
            KIN_images.append(challenges["KIN"])

    fidelity_challenges_pairs = []
    for image_list in [IN_images, TIN_images, KIN_images]:
        fidelity_challenges_pairs.extend(get_random_pairs(reference_images, image_list, R))
    return fidelity_challenges_pairs

def append_fidelity_challenges(fidelity_challenges, hashed_fidelity_challenges, fidelity_challenges_pairs, curr=0):
    for i, pair in enumerate(fidelity_challenges_pairs):
        real, fake = pair[0], pair[1]
        fidelity_challenges[f'{i+curr:04}'] = {
            'REAL': real,
            'FAKE': fake
        }
        hashed_fidelity_challenges[f'{i+curr:04}'] = {
            'REAL': get_sha256_id(real),
            'FAKE': get_sha256_id(fake)
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('quality_challenges', help='input json file of quality challenges which contains raw filenames')
    parser.add_argument('fidelity_challenges', help='output json file of fidelity challenges which contains raw filenames')
    parser.add_argument('hashed_fidelity_challenges', help='output json file of fidelity challenges which contains hashed filenames')

    args = parser.parse_args()

    with open(args.quality_challenges, 'r') as f:
        quality_challenges = json.load(f)

    
    
    fidelity_challenges = {}
    hashed_fidelity_challenges = {}

    curr=0
    fidelity_challenges_pairs = get_fidelity_challenges_pairs(datasets=["lung_lesion", "COAD", "breast"], R=4)
    append_fidelity_challenges(fidelity_challenges, hashed_fidelity_challenges, fidelity_challenges_pairs, curr=curr)
    curr += len(fidelity_challenges_pairs)

    fidelity_challenges_pairs = get_fidelity_challenges_pairs(datasets=["glioma"], R=4)
    append_fidelity_challenges(fidelity_challenges, hashed_fidelity_challenges, fidelity_challenges_pairs, curr=curr)
    curr += len(fidelity_challenges_pairs)

    fidelity_challenges_pairs = get_fidelity_challenges_pairs(datasets=["kyoto"], R=4)
    append_fidelity_challenges(fidelity_challenges, hashed_fidelity_challenges, fidelity_challenges_pairs, curr=curr)

    with open(args.fidelity_challenges, 'w') as f:
        json.dump(fidelity_challenges, f, indent='\t')

    with open(args.hashed_fidelity_challenges, 'w') as f:
        json.dump(hashed_fidelity_challenges, f, indent='\t')

    

    

    
