from django.urls import path
from users import views
from referral.views import TrackReferralClickView, ReferralStatsView
from contact.views import ContactRelayView
from api.views import TriggerScrapeView

urlpatterns = [
    path("signup/", views.UserSignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('track-click/<str:username>/', TrackReferralClickView.as_view()),
    path('stats/', ReferralStatsView.as_view(), name='referral-stats'),
    path("contact/", ContactRelayView.as_view(), name="contact"),
    path('profile/update/', views.ProfileUpdateView.as_view(), name='profile_update'),
    path('verify-user/<str:username>/', views.VerifyUserExistenceView.as_view(), name='verify-user-existence'),
    path('trigger-scrape/', TriggerScrapeView.as_view(), name='trigger-scrape'),
]