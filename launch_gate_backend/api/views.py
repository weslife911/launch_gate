from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings

class TriggerScrapeView(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny]

    def post(self, request):
        from .scraper import scrape_opportunity_desk
        
        auth_header = request.headers.get("Authorization", "")
        
        expected_token = f"Bearer {settings.SCRAPER_TOKEN.strip()}"

        if auth_header.strip() != expected_token:
            return Response({"error": "Unauthorized access"}, status=403)

        success = scrape_opportunity_desk()

        if success:
            return Response({"success": True, "message": "Scraper executed."})
        return Response({"success": False, "message": "Scraper failed."}, status=500)