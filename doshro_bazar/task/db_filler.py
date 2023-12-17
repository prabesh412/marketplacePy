import json
import os
from doshro_bazar.category.models import Category
from doshro_bazar.users.models import User
from doshro_bazar.listings.models import Listings
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
            category_objects.append(Category(id=random.randint(1, 100000), name=child_categories['name'], slug=slugify(child_categories['name']), parent_id=id, id_from_api=child_categories['id']))
        
        category_objects.append(Category(id=id, name=name, slug=slug, parent_id=None, id_from_api=category['id'], main_category_image=category['image']))
 
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


def fill_listings_db():
    file_path = os.path.join(os.path.dirname(__file__), 'mock', 'computer.json')
    with open(file_path, 'r') as f:
        data = json.load(f)
    products  = data['data']
    user_admin = User.objects.get(username="root")
    listing_objects = []
    for product in products:
        listing_objects.append(Listings( name=product["name"], description=product["description"], price=product["price"], category_id=product["category"], user=user_admin, slug=slugify(product["name"])))

    Listings.objects.bulk_create(listing_objects, ignore_conflicts=True)


def create_link():
    file_path = os.path.join(os.path.dirname(__file__), 'mock', 'product.json')
    base_url = "https://hamrobazaar.com/"
    listings_object = []
    user_admin = User.objects.get(username="root")

    with open(file_path, 'r') as f:
        data = json.load(f)

    datas =data["data"]
    for product in datas: 
        url = base_url + slugify(product["categoryName"]) + "/" + slugify(product["name"]) + "-in-nepal" + "/" + product["id"].replace("-", "") 
        listing_category = Category.objects.get(slug=slugify(product["categoryName"]))
        listings_object.append(Listings(slug= slugify(product["name"]), link_to_original=url, is_featured= True,banner_image=product["imageUrl"],category = listing_category, description=product["description"], price=product["price"], user=user_admin, title = product["name"], phone_number=product["creatorInfo"]["createdBy"], location=product["location"]["locationDescription"], is_scraped=True))
    
    Listings.objects.bulk_create(listings_object, ignore_conflicts=True)



def run():
    fill_category_db()


if __name__ == '__main__': 
    run()