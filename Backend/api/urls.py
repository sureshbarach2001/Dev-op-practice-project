from django.urls import path
from .views import RegisterUserAPIView, LoginUserAPIView

urlpatterns = [
    path('api/register/', RegisterUserAPIView.as_view(), name='register'),
    path('api/login/', LoginUserAPIView.as_view(), name='login'),
    # Add other URL patterns here
]
