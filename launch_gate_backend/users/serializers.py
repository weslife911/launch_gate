from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Niche

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    niche_focus = serializers.ListField(child=serializers.CharField(), write_only=True, required=False)

    class Meta:
        model = User
        fields = [
            'email', 'username', 'full_name', 'phone_number',
            'country', 'region', 'city', 'referral_slug',
            'niche_focus', 'password', 'confirm_password'
        ]

    def validate(self, data):
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)
        niche_names = validated_data.pop('niche_focus', [])
        password = validated_data.pop('password')
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        for name in niche_names:
            niche_obj, _ = Niche.objects.get_or_create(name=name)
            user.niches.add(niche_obj)
            
        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")

        data["user"] = user
        return data

class NicheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Niche
        fields = ['id', 'name']

class UserDetailSerializer(serializers.ModelSerializer):
    niches = NicheSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'full_name', 'phone_number',
            'country', 'region', 'city', 'niches', 'referral_slug',
            'account_status', 'date_joined', 'last_login'
        ]