from django.urls import path
from . import views
from referral.views import TrackReferralClickView, ReferralStatsView
from contact.views import ContactRelayView

urlpatterns = [
    path("signup/", views.UserSignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('track-click/<str:username>/', TrackReferralClickView.as_view()),
    path('stats/', ReferralStatsView.as_view(), name='referral-stats'),
    path("contact/", ContactRelayView.as_view(), name="contact"),
]