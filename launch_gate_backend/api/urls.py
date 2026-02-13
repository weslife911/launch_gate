from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.UserSignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
    path('track-click/<str:username>/', views.TrackReferralClickView.as_view()),
    path('stats/', views.ReferralStatsView.as_view(), name='referral-stats'),
]