from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, FeedbackViewSet, UserProfileView, ResourceViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'resources', ResourceViewSet, basename='resource')

urlpatterns = [
    path('auth/profile/<int:pk>/', UserProfileView.as_view(), name='user-profile'),
    path('', include(router.urls)),
]
