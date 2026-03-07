from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.conf import settings
from .scraper import scrape_opportunity_desk

class TriggerScrapeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        provided_token = request.headers.get("Authorization")
        expected_token = f"Bearer {settings.SCRAPER_TOKEN}"

        if provided_token != expected_token:
            return Response({"error": "Unauthorized access"}, status=403)

        success = scrape_opportunity_desk()

        if success:
            return Response({"success": True, "message": "Scraper executed successfully."})
        else:
            return Response({"success": False, "message": "Scraper failed."}, status=500)