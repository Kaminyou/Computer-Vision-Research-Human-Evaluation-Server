import argparse
import itertools
import json
import random

from src.utils import get_sha256_id


def get_random_pairs(list_a, list_b, num_pair=5):
    return random.sample(list(itertools.product(list_a,list_b)), num_pair)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description='Hasing the filenames')
    parser.add_argument('quality_challenges', help='input json file of quality challenges which contains raw filenames')
    parser.add_argument('fidelity_challenges', help='output json file of fidelity challenges which contains raw filenames')
    parser.add_argument('hashed_fidelity_challenges', help='output json file of fidelity challenges which contains hashed filenames')

    args = parser.parse_args()

    with open(args.quality_challenges, 'r') as f:
        quality_challenges = json.load(f)

    reference_images = []
    IN_images = []
    TIN_images = []
    KIN_images = []
    R = 5
    for challenges in quality_challenges.values():
        reference_images.append(challenges["reference"])
        IN_images.append(challenges["IN"])
        TIN_images.append(challenges["TIN"])
        KIN_images.append(challenges["KIN"])

    fidelity_challenges_pairs = []
    for image_list in [IN_images, TIN_images, KIN_images]:
        fidelity_challenges_pairs.extend(get_random_pairs(reference_images, image_list, R))
    
    fidelity_challenges = {}
    hashed_fidelity_challenges = {}

    for i, pair in enumerate(fidelity_challenges_pairs):
        real, fake = pair[0], pair[1]
        fidelity_challenges[f'{i:04}'] = {
            'REAL': real,
            'FAKE': fake
        }
        hashed_fidelity_challenges[f'{i:04}'] = {
            'REAL': get_sha256_id(real),
            'FAKE': get_sha256_id(fake)
        }

    with open(args.fidelity_challenges, 'w') as f:
        json.dump(fidelity_challenges, f)

    with open(args.hashed_fidelity_challenges, 'w') as f:
        json.dump(hashed_fidelity_challenges, f)

    

    

    
