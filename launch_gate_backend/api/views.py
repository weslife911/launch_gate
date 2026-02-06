from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from users.serializers import SignupSerializer, LoginSerializer

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
