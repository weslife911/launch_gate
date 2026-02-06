from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.UserSignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path('check-auth/', views.CheckAuthView.as_view(), name='check-auth'),
]