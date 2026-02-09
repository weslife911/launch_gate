from django.contrib import admin
from .models import User, ClickLog

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'referral_count', 'account_status', 'role')
    search_fields = ('username', 'email', 'full_name')
    list_filter = ('account_status', 'role')

@admin.register(ClickLog)
class ClickLogAdmin(admin.ModelAdmin):
    list_display = ('referrer', 'clicked_at')