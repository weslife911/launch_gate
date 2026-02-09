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
    
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('user', 'User'),
    ]
    role = models.CharField(
        max_length=10, 
        choices=ROLE_CHOICES, 
        default='user'
    )

    referral_count = models.PositiveIntegerField(default=0)

    STATUS_CHOICES = [
        ('pending_verification', 'Pending Verification'),
        ('active', 'Active'),
        ('suspended', 'Suspended'),
    ]
    account_status = models.CharField(
        max_length=25, 
        choices=STATUS_CHOICES, 
        default='pending_verification'
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

# users/models.py
from django.db import models
from django.conf import settings

class ClickLog(models.Model):
    # Link the click to the user who owns the referral link
    referrer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='clicks'
    )
    # The exact day and time the click occurred
    clicked_at = models.DateTimeField(auto_now_add=True) 
    
    # Optional: Track where the click came from (e.g., 'whatsapp', 'twitter')
    source = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Click for {self.referrer.username} on {self.clicked_at.date()}"