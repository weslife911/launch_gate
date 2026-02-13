from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from users.models import ClickLog, User
from users.serializers import SignupSerializer, LoginSerializer, UserDetailSerializer
from django.shortcuts import get_object_or_404
from django.db.models import F

class UserSignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "message": serializer.errors})
        
        try:
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "success": True,
                "tokens": {"refresh": str(refresh), "access": str(refresh.access_token)}
            })
        except Exception as e:
            return Response({"success": False, "message": str(e)})

class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "message": serializer.errors})

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "tokens": {"refresh": str(refresh), "access": str(refresh.access_token)}
        })

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserDetailSerializer(request.user)
        return Response({"success": True, "user": serializer.data})

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
        stats = (
            ClickLog.objects.filter(referrer=request.user)
            .annotate(date=TruncDay('clicked_at'))
            .values('date')
            .annotate(clicks=Count('id'))
            .order_by('date')
        )
        
        formatted_stats = [
            {
                "date": item['date'].strftime('%Y-%m-%d'),
                "clicks": item['clicks']
            } 
            for item in stats
        ]
        
        return Response(formatted_stats)