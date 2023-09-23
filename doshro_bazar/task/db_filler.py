import json
import os
from doshro_bazar.category.models import Category
from doshro_bazar.users.models import User
from django.utils.text import slugify
import random

def fill_category_db():
    file_path = os.path.join(os.path.dirname(__file__), 'mock', 'data.json')
    with open(file_path, 'r') as f:
        data = json.load(f)
    
    categories = data['data']
    category_objects = []
    for (category) in categories:
        id=random.randint(1, 100000)
        name = category['name']
        slug = slugify(name)
        for child_categories in category["categories"]:
            category_objects.append(Category(id=random.randint(1, 100000), name=child_categories['name'], slug=slugify(child_categories['name']), parent_id=id))
        
        category_objects.append(Category(id=id, name=name, slug=slug, parent_id=None))
 
    Category.objects.bulk_create(category_objects, ignore_conflicts=True)
    

def fill_users_db():
    file_path = os.path.join(os.path.dirname(__file__), 'mock', 'product.json')
    with open(file_path, 'r') as f:
        data = json.load(f)
    products  = data['data']
    user_objects = []
    for product in products:
        user_objects.append(User(id=random.randint(1,100000), name=product["creatorInfo"]['createdByName'], username=product["creatorInfo"]['createdByUsername']))

    User.objects.bulk_create(user_objects, ignore_conflicts=True)
   

def run():
    fill_users_db()


if __name__ == '__main__':
    run()