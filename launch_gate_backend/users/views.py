from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from users.serializers import SignupSerializer, LoginSerializer, UserDetailSerializer, UserUpdateSerializer
import logging

logger = logging.getLogger(__name__)

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


class ProfileUpdateView(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserUpdateSerializer

    def get_object(self):
        # Always return the current logged-in user
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True) # Enable PATCH by default
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response({
                "success": True, 
                "message": "Profile updated successfully",
                "user": serializer.data
            })
            
        return Response({
            "success": False, 
            "message": serializer.errors
        })