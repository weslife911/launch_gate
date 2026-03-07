import requests
from bs4 import BeautifulSoup
from opportunity.models import Opportunity

def scrape_opportunity_desk():
    url = "https://opportunitydesk.org/category/scholarships/"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        print("DEBUG: Starting scrape for Scholarships...")
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code != 200:
            print(f"DEBUG: HTTP Error {response.status_code}")
            return False

        soup = BeautifulSoup(response.text, 'html.parser')
        # Look for titles in H2 tags (common on OD)
        posts = soup.find_all('h2') 
        
        if not posts:
            print("DEBUG: No posts/h2 tags found. HTML structure might be blocked.")
            return False

        # Just try to save ONE item to test the database
        first_post = posts[0].get_text(strip=True)
        print(f"DEBUG: Found item: {first_post[:30]}...")
        
        # This is where it likely fails if the DB is slow
        Opportunity.objects.update_or_create(
            link="https://test.com/1", 
            defaults={'title': 'Test Scrape', 'category': 'Academia and Scholarships'}
        )
        
        print("DEBUG: Successfully saved to Database!")
        return True

    except Exception as e:
        print(f"DEBUG: CRASH ERROR: {str(e)}")
        return False