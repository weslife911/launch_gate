from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings

class TriggerScrapeView(APIView):
    authentication_classes = [] 
    permission_classes = [AllowAny]

    def post(self, request):
        auth_header = request.headers.get("Authorization", "")
        if not settings.SCRAPER_TOKEN:
             return Response({"error": "SCRAPER_TOKEN not set in server settings"}, status=500)
             
        expected_token = f"Bearer {settings.SCRAPER_TOKEN.strip()}"

        if auth_header.strip() != expected_token:
            return Response({"error": "Unauthorized access"}, status=403)

        try:
            from .scraper import scrape_opportunity_desk
            items_count = scrape_opportunity_desk()

            return Response({
                "success": True, 
                "items_processed": items_count,
                "message": "Scraper executed successfully."
            }, status=200)

        except Exception as e:
            return Response({
                "success": False, 
                "error": str(e),
                "message": "Scraper crashed during execution."
            }, status=500)