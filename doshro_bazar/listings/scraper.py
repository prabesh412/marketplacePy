import requests
import json
import os
from celery import shared_task
from doshro_bazar.category.models import Category
from doshro_bazar.listings.models import Listings
from doshro_bazar.users.models import User
from django.utils.text import slugify
import random

def dump_listing_data(data):

    base_url = "https://hamrobazaar.com/"
    listings_object = []
    user_admin = User.objects.get(username="root")

    datas =data["data"]
    for product in datas: 
        url = base_url + slugify(product["categoryName"]) + "/" + slugify(product["name"]) + "-in-nepal" + "/" + product["id"].replace("-", "") 
        listing_category = Category.objects.get(slug=slugify(product["categoryName"]))
        listings_object.append(Listings(slug= slugify(product["name"]), link_to_original=url, is_featured= True,banner_image=product["imageUrl"],category = listing_category, description=product["description"], price=product["price"], user=user_admin, title = product["name"], phone_number=product["creatorInfo"]["createdBy"], location=product["location"]["locationDescription"], is_scraped=True, scraped_username=product["creatorInfo"]["createdByName"], scraped_views=product["totalViews"]))
    print(listings_object)
    Listings.objects.bulk_create(listings_object, ignore_conflicts=True)
    return True

def scrape_listing_paginated(category_id):
    url = f"https://api.hamrobazaar.com/api/Product?PageSize=27&CategoryId={category_id}&IsHBSelect=false&PageNumber=1"
    payload = ""
    headers = {
    'Apikey': '09BECB8F84BCB7A1796AB12B98C1FB9E'
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    if response.status_code == 200:
        data = response.json()
        res =dump_listing_data(data)

        if res:
            return True


