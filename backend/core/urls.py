from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, FeedbackViewSet, UserProfileView, ResourceViewSet, UserListView, ProjectViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'feedback', FeedbackViewSet, basename='feedback')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('auth/profile/<int:pk>/', UserProfileView.as_view(), name='user-profile'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('', include(router.urls)),
]
