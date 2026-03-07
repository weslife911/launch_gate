import requests
from bs4 import BeautifulSoup
from opportunity.models import Opportunity

def scrape_opportunity_desk():
    url = "https://opportunitydesk.org/category/fellowships-and-scholarships/"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    }

    try:
        print(f"DEBUG: Attempting to scrape: {url}")
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code != 200:
            print(f"DEBUG: HTTP Error {response.status_code}")
            return False

        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for all 'a' tags inside 'h2' tags
        # This is the most reliable way to find titles and links on WordPress
        found_items = soup.select('h2 a') 
        
        if not found_items:
            # Plan B: Look for any links with 'opportunitydesk.org/2026/' in the URL
            found_items = [a for a in soup.find_all('a', href=True) if '/2026/' in a['href']]

        if not found_items:
            print("DEBUG: Still no items found. Printing HTML snippet for debug:")
            print(response.text[:500]) # This helps us see if we're getting a "Pardon our interruption" page
            return False

        count = 0
        for item in found_items:
            title = item.get_text(strip=True)
            link = item['href']
            
            if title and link.startswith('http'):
                Opportunity.objects.update_or_create(
                    link=link,
                    defaults={'title': title, 'category': 'Fellowships & Scholarships'}
                )
                count += 1
        
        print(f"DEBUG: Successfully saved {count} opportunities!")
        return count > 0

    except Exception as e:
        print(f"DEBUG: CRASH ERROR: {str(e)}")
        return False