from django.contrib import admin
from opportunity.models import Opportunity

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date_scraped')
    list_filter = ('category',)
    search_fields = ('title', 'description')
    list_per_page = 20