import requests
import time
from decouple import config
from bs4 import BeautifulSoup
from opportunity.models import Opportunity

def get_clean_category(slug):
    slug = slug.lower()
    if any(word in slug for word in ['scholarship', 'study-abroad', 'undergraduate', 'masters', 'phd']):
        return 'scholarship'
    if any(word in slug for word in ['internship', 'volunteering', 'jobs']):
        return 'internship'
    if 'fellowship' in slug:
        return 'fellowship'
    if any(word in slug for word in ['award', 'grant', 'competition', 'contest']):
        return 'contest'
    return 'other'

def scrape_opportunity_desk():
    BASE_URL = config('OPPORTUNITY_SCRAPER_URL').rstrip('/')
    
    category_paths = [
        "category/fellowships-and-scholarships/",
        "category/awards/",
        "category/awards-and-grants/",
        "category/training-and-conference/",
        "category/jobs-and-internships/internships/",
        "category/fellowships-and-scholarships/undergraduate/",
        "category/fellowships-and-scholarships/online-courses/",
        "category/fellowships-and-scholarships/phd-post-doctoral/",
        "category/grants/",
        "category/fellowships/"
    ]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
    
    session = requests.Session()
    session.headers.update(headers)
    total_saved = 0

    for path in category_paths:
        url = f"{BASE_URL}/{path}"
        slug = path.strip('/').split('/')[-1]
        db_category = get_clean_category(slug)

        try:
            print(f"DEBUG: Scraping {url} as {db_category}...")
            response = session.get(url, timeout=10)
            if response.status_code != 200:
                continue

            soup = BeautifulSoup(response.text, 'html.parser')
            articles = soup.find_all('article')

            for article in articles:
                title_tag = article.select_one('h2.entry-title a')
                if not title_tag:
                    continue
                
                link = title_tag['href']
                
                img_tag = article.find('img')
                image_url = None
                if img_tag:
                    image_url = img_tag.get('data-src') or img_tag.get('data-lazy-src') or img_tag.get('src')

                desc_tag = article.select_one('.entry-content p, .entry-summary p')
                description = desc_tag.get_text(strip=True) if desc_tag else ""

                Opportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        'title': title_tag.get_text(strip=True),
                        'description': description,
                        'image_url': image_url,
                        'category': db_category
                    }
                )
                total_saved += 1
            
            time.sleep(0.3)

        except Exception as e:
            print(f"DEBUG: Error on {url}: {e}")
            continue

    print(f"DEBUG: Finished. Processed {total_saved} items.")
    return total_saved > 0