from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    full_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)
    region = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    
    role = models.CharField(
        max_length=10, 
        choices=[('admin', 'Admin'), ('user', 'User')], 
        default='user'
    )

    referral_count = models.PositiveIntegerField(default=0)

    account_status = models.CharField(
        max_length=25, 
        choices=[
            ('pending_verification', 'Pending Verification'),
            ('active', 'Active'),
            ('suspended', 'Suspended'),
        ], 
        default='pending_verification'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class ClickLog(models.Model):
    referrer = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='clicks'
    )
    clicked_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"{self.referrer.username} click at {self.clicked_at}"