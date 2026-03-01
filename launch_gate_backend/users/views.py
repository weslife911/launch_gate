from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from users.serializers import SignupSerializer, LoginSerializer, UserDetailSerializer, UserUpdateSerializer
import logging
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

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
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial, context={'request': request})
        
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
        }, status=400)

class VerifyUserExistenceView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, username):
        try:
            user = User.objects.get(username__iexact=username)
            
            return Response({
                "success": True,
                "message": "User with the given username does not exist",
            }, status=status.HTTP_200_OK)
            
        except User.DoesNotExist:
            return Response({
                "success": False,
                "message": f"User with username '{username}' was not found."
            }, status=status.HTTP_404_NOT_FOUND)