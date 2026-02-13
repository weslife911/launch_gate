from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import ClickLog, User
from django.db.models.functions import TruncDay
from django.shortcuts import get_object_or_404
from django.db.models import F, Count

# Create your views here.
class TrackReferralClickView(APIView):
    """Increments count and logs the timestamp for charts."""
    permission_classes = [AllowAny]

    def post(self, request, username):
        ambassador = get_object_or_404(User, username=username)
        ambassador.referral_count = F('referral_count') + 1
        ambassador.save()
        ClickLog.objects.create(referrer=ambassador)
        return Response({"success": True})


class RecordClickView(APIView):
    permission_classes = [AllowAny] # Clicks are usually from anonymous guests

    def post(self, request, referral_slug):
        try:
            # Find the ambassador owner of the slug
            user = User.objects.get(referral_slug=referral_slug)
            
            # Create the log entry (clicked_at is handled automatically)
            ClickLog.objects.create(referrer=user, source=request.data.get('source'))
            
            return Response({"success": True})
        except User.DoesNotExist:
            return Response({"success": False, "message": "Invalid slug"}, status=404)

class ReferralStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            stats = (
                ClickLog.objects.filter(referrer=request.user)
                .annotate(date=TruncDay('clicked_at'))
                .values('date')
                .annotate(clicks=Count('id'))
                .order_by('date')
            )
            
            formatted_data = [
                {
                    "date": item['date'].strftime('%Y-%m-%d') if item['date'] else "Unknown",
                    "clicks": item['clicks']
                } 
                for item in stats
            ]
            
            return Response(formatted_data)
        except Exception as e:
            print(f"Stats Error: {e}")
            return Response({"error": str(e)}, status=500)