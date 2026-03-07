from django.db import models

class Opportunity(models.Model):
    CATEGORY_CHOICES = [
        ('scholarship', 'Scholarship'),
        ('internship', 'Internship'),
        ('fellowship', 'Fellowship'),
        ('contest', 'Contest/Award'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=500)
    link = models.URLField(unique=True)
    description = models.TextField(null=True, blank=True)
    image_url = models.URLField(null=True, blank=True)
    category = models.CharField(
        max_length=20, 
        choices=CATEGORY_CHOICES, 
        default='other'
    )
    date_scraped = models.DateTimeField(auto_now=True)

    def __cl__ (self):
        return self.title