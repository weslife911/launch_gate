import requests
from bs4 import BeautifulSoup
from opportunity.models import Opportunity
from decouple import config

def scrape_opportunity_desk():
    url = config("OPPORTUNITY_SCRAPER_URL", cast=str)
    if not url:
        print("Scraper Error: OPPORTUNITY_SCRAPER_URL not found in environment.")
        return False
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers)
        soup = BeautifulSoup(response.text, 'html.parser')

        posts = soup.find_all('article', class_='post')

        for post in posts:
            title_tag = post.find('h2', class_='entry-title')
            link_tag = title_tag.find('a') if title_tag else None
            img_tag = post.find('img')
            
            if title_tag and link_tag:
                title = link_tag.get_text(strip=True)
                link = link_tag['href']
                image_url = img_tag['src'] if img_tag else None
                
                category = 'scholarship'
                if 'internship' in title.lower(): category = 'internship'
                elif 'fellowship' in title.lower(): category = 'fellowship'
                elif 'award' in title.lower() or 'contest' in title.lower(): category = 'contest'

                Opportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        'title': title,
                        'thumbnail': image_url,
                        'category': category,
                    }
                )
        return True
    except Exception as e:
        print(f"Scraper Error: {e}")
        return False