import uuid

from src.data import image_dict


def get_primary_key():
    return str(uuid.uuid4())

def get_data_mapping_dict():
    return image_dict
