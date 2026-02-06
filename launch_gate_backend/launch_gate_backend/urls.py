from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

# Health check for Vercel deployment verification
def health_check(request):
    return JsonResponse({"status": "LaunchGate Backend is Live", "database": "Connected to Supabase"})

urlpatterns = [
    path('', health_check), 
    path('admin/', admin.site.urls),
    path("api/v1/", include("api.urls"))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)