import requests
import json
import os
from doshro_bazar.category.models import Category
from doshro_bazar.users.models import User
from django.utils.text import slugify
import random

def scrape_categories():
    url = "https://api.hamrobazaar.com/api/AppData/GetAllCategory"
    payload = ""
    headers = {
    'Apikey': '09BECB8F84BCB7A1796AB12B98C1FB9E'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json()["data"]

def fill_category_db(categories):
    category_objects = []
    for (category) in categories:
        id=random.randint(1, 100000)
        name = category['name']
        slug = slugify(name)
        for child_categories in category["categories"]:
            category_objects.append(Category(id=random.randint(1, 100000), name=child_categories['name'], slug=slugify(child_categories['name']), parent_id=id))
        
        category_objects.append(Category(id=id, name=name, slug=slug, parent_id=None))
 
    Category.objects.bulk_create(category_objects, ignore_conflicts=True)