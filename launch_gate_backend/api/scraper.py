import requests
import time
from decouple import config
from bs4 import BeautifulSoup
from opportunity.models import Opportunity

def get_clean_category(slug):
    slug = slug.lower()
    if any(word in slug for word in ['scholarship', 'study-abroad', 'undergraduate', 'masters', 'phd', 'postdoctoral', 'education']):
        return 'scholarship'
    if any(word in slug for word in ['internship', 'volunteering', 'jobs', 'work']):
        return 'internship'
    if 'fellowship' in slug:
        return 'fellowship'
    if any(word in slug for word in ['award', 'grant', 'competition', 'contest', 'prize']):
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
        "category/jobs-and-internships/volunteering/",
        "category/fellowships-and-scholarships/undergraduate/",
        "category/fellowships-and-scholarships/online-courses/",
        "category/fellowships-and-scholarships/short-courses/",
        "category/fellowships-and-scholarships/phd-post-doctoral/",
        "category/fellowships-and-scholarships/study-abroad/study-in-africa/",
        "category/fellowships-and-scholarships/study-abroad/study-in-europe/",
        "category/fellowships-and-scholarships/study-abroad/study-in-asia/",
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
            response = session.get(url, timeout=12)
            
            if response.status_code != 200:
                print(f"DEBUG: Failed to reach {url} (Status: {response.status_code})")
                continue

            soup = BeautifulSoup(response.text, 'html.parser')
            
            articles = soup.find_all('article')
            
            if not articles:
                articles = soup.select('.post') or soup.select('.type-post')

            for article in articles:
                title_tag = article.select_one('h2.entry-title a, h2 a')
                if not title_tag:
                    continue
                
                title = title_tag.get_text(strip=True)
                link = title_tag.get('href')

                if not link:
                    continue

                img_tag = article.find('img')
                image_url = None
                if img_tag:
                    image_url = (
                        img_tag.get('data-lazy-src') or 
                        img_tag.get('data-src') or 
                        img_tag.get('src')
                    )

                desc_tag = article.select_one('.entry-content p, .entry-summary p, .post-content p')
                if desc_tag:
                    description = desc_tag.get_text(strip=True)
                else:
                    description = article.get_text(" ", strip=True)[:200] + "..."

                Opportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        'title': title,
                        'description': description,
                        'image_url': image_url,
                        'category': db_category
                    }
                )
                total_saved += 1
            
            time.sleep(0.5)

        except Exception as e:
            print(f"DEBUG: Error processing {url}: {str(e)}")
            continue

    print(f"DEBUG: Scrape finished. Total items processed: {total_saved}")
    return total_saved