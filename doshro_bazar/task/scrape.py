from celery import shared_task
import requests
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)

@shared_task
def scrape():
    logger.info("Scraping started")
    
    
   
