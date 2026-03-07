from django.db import models

class Opportunity(models.Model):
    CATEGORY_CHOICES = [
        ('scholarship', 'Scholarship'),
        ('internship', 'Internship'),
        ('fellowship', 'Fellowship'),
        ('contest', 'Contest/Award'),
    ]

    title = models.CharField(max_length=500)
    link = models.URLField(unique=True)
    thumbnail = models.URLField(null=True, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='scholarship')
    deadline = models.CharField(max_length=100, null=True, blank=True)
    date_scraped = models.DateTimeField(auto_now_add=True)

    def __cl__ (self):
        return self.title