from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from launch_gate_backend.users.models import ClickLog, User
from users.serializers import SignupSerializer, LoginSerializer, UserDetailSerializer
from django.shortcuts import get_object_or_404
from django.db.models import F

class UserSignupView(CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": serializer.errors
            })
        
        try:
            user = serializer.save()
            refresh = RefreshToken.for_user(user)

            return Response({
                "success": True,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            })

class LoginView(CreateAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": serializer.errors
            })

        try:
            user = serializer.validated_data['user']
            refresh = RefreshToken.for_user(user)

            return Response({
                "success": True,
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            })

        except Exception as e:
            return Response({
                "success": False,
                "message": str(e)
            })

class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserDetailSerializer(user)
        
        return Response({
            "success": True,
            "user": serializer.data
        })

class TrackReferralClickView(APIView):
    """
    Updates the referral_count by 1 when a user clicks 
    a WhatsApp link on an ambassador's page.
    """
    permission_classes = [AllowAny]

    def post(self, request, username):
        # Locate ambassador by username from the referral link
        ambassador = get_object_or_404(User, username=username)
        
        # Atomic increment to ensure accuracy
        ambassador.referral_count = F('referral_count') + 1
        ambassador.save()
        
        return Response({
            "success": True, 
            "message": "Click tracked successfully."
        })


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