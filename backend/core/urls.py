from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserProfileView, TaskViewSet, FeedbackViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'feedback', FeedbackViewSet)

urlpatterns = [
    path('auth/profile/<int:pk>/', UserProfileView.as_view(), name='user-profile'),
    path('', include(router.urls)),
]
