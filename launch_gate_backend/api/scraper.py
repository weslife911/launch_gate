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
    if any(word in slug for word in ['medicine', 'nursing', 'health', 'medical', 'clinical']):
        return 'health'
    if any(word in slug for word in ['arts', 'culture', 'writing', 'creative', 'design', 'humanities']):
        return 'arts'
    if any(word in slug for word in ['science', 'innovation', 'research', 'technology', 'engineering', 'stem']):
        return 'science'
    if any(word in slug for word in ['training', 'conference', 'workshop', 'seminar', 'course']):
        return 'training'
    
    return 'other'

def scrape_deep_details(session, url):
    try:
        response = session.get(url, timeout=12)
        if response.status_code != 200:
            return None, None
            
        soup = BeautifulSoup(response.text, 'html.parser')
        
        image_url = None
        img_link = soup.find('link', attrs={'as': 'image', 'imagesrcset': True})
        if img_link:
            image_url = img_link['imagesrcset'].split(',')[-1].split(' ')[0]

        content_div = soup.select_one('.entry-content')
        description = ""
        if content_div:
            for tag in content_div(['script', 'style', 'ins', 'div.sharedaddy']):
                tag.decompose()
            description = content_div.get_text(separator='\n', strip=True)

        return image_url, description
    except Exception as e:
        print(f"DEBUG: Error deep scraping {url}: {str(e)}")
        return None, None

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

                deep_image, deep_description = scrape_deep_details(session, link)

                Opportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        'title': title,
                        'description': deep_description or "View details on the official page.",
                        'image_url': deep_image,
                        'category': db_category
                    }
                )
                total_saved += 1
                time.sleep(1) 
            
            time.sleep(2)

        except Exception as e:
            print(f"DEBUG: Error processing {url}: {str(e)}")
            continue

    print(f"DEBUG: Scrape finished. Total items processed: {total_saved}")
    return total_saved