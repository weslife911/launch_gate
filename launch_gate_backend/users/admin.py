from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'referral_count', 'account_status', 'role')
    search_fields = ('username', 'email', 'full_name')
    list_filter = ('account_status', 'role')