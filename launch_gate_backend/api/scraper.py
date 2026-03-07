import requests
from bs4 import BeautifulSoup
from .models import Opportunity
import time

def scrape_opportunity_desk():
    category_mapping = {
        "Writing, Culture and Creative Arts": ["writing", "culture", "arts", "creative", "competition"],
        "Science, Technology and Innovation": ["science", "technology", "innovation", "tech", "engineering"],
        "Academia and Scholarships": ["academia", "scholarship", "university", "study"],
        "Health, Medicine and Nursing": ["health", "medicine", "nursing", "medical", "biomedical"]
    }

    target_urls = [
        "https://opportunitydesk.org/category/scholarships/",
        "https://opportunitydesk.org/category/competitions/",
        "https://opportunitydesk.org/category/fellowships/",
        "https://opportunitydesk.org/category/internships/"
    ]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    new_items_count = 0

    for url in target_urls:
        try:
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, 'html.parser')
            posts = soup.find_all('article', class_='post')

            for post in posts:
                title_tag = post.find('h2', class_='entry-title')
                if not title_tag: continue
                
                link_tag = title_tag.find('a')
                title = link_tag.get_text(strip=True).lower()
                link = link_tag['href']
                img_tag = post.find('img')
                image_url = img_tag['src'] if img_tag else None

                assigned_category = "Other"
                
                matched = False
                for official_name, keywords in category_mapping.items():
                    if any(word in title for word in keywords):
                        assigned_category = official_name
                        matched = True
                        break
                
                if not matched:
                    continue

                _, created = Opportunity.objects.update_or_create(
                    link=link,
                    defaults={
                        'title': title.title(),
                        'thumbnail': image_url,
                        'category': assigned_category,
                    }
                )
                if created: new_items_count += 1
            
            time.sleep(1)

        except Exception as e:
            print(f"Scrape error on {url}: {e}")
            continue

    return new_items_count > 0