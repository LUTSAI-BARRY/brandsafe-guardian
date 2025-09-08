from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Health check
    path('health/', views.health_check, name='health_check'),
    
    # Authentication endpoints
    path('auth/register/', views.UserRegistrationView.as_view(), name='user_register'),
    path('auth/login/', views.UserLoginView.as_view(), name='user_login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User profile
    path('profile/', views.UserProfileView.as_view(), name='user_profile'),
    
    # Content moderation
    path('moderate/', views.ContentModerationView.as_view(), name='content_moderation'),
    path('history/', views.ModerationHistoryView.as_view(), name='moderation_history'),
    
    # Dashboard
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),
]