from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import Manager

class Niche(models.Model):
    NICHE_CHOICES = [
        ('writing', 'Writing, Cultural & Creative Arts'),
        ('science', 'Science, Technology & Engineering'),
        ('academia', 'Academia & Scholarships'),
        ('health', 'Health, Medicine & Nursing'),
    ]
    name = models.CharField(max_length=100, unique=True, choices=NICHE_CHOICES)

    def __str__(self) -> str:
        return str(self.get_name_display())


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

    niches = models.ManyToManyField(Niche, blank=True)

    referral_slug = models.SlugField(unique=True, blank=True, null=True)
    STATUS_CHOICES = [
        ('pending_verification', 'Pending Verification'),
        ('active', 'Active'),
        ('suspended', 'Suspended'),
    ]
    account_status = models.CharField(
        max_length=30, 
        choices=STATUS_CHOICES, 
        default='pending_verification'
    )

    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email