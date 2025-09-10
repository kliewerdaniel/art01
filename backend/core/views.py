from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Task, Feedback, User, Resource, Project
from .serializers import (
    TaskSerializer, FeedbackSerializer,
    UserProfileSerializer, UserProfileUpdateSerializer, ResourceSerializer,
    ProjectSerializer
)
from .permissions import IsMentorOrAdmin, IsMentorOrOwner, IsTaskParticipant

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()  # Add default queryset
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = Task.objects.all()
        participant_id = self.request.query_params.get('participant_id', None)
        
        if participant_id:
            queryset = queryset.filter(assigned_to_id=participant_id)
        elif not self.request.user.role in ['MENTOR', 'ADMIN']:
            # If not mentor/admin, only show own tasks
            queryset = queryset.filter(assigned_to=self.request.user)
            
        return queryset.select_related('assigned_to', 'assigned_by')
    
    def get_permissions(self):
        if self.action in ['create']:
            return [IsAuthenticated(), IsMentorOrAdmin()]
        return [IsAuthenticated(), IsMentorOrOwner()]
    
    def perform_create(self, serializer):
        # If assigned_by not provided, set to request.user
        if not serializer.validated_data.get('assigned_by'):
            serializer.save(assigned_by=self.request.user)
        else:
            serializer.save()
    
    @action(detail=True, methods=['patch'])
    def status(self, request, pk=None):
        task = self.get_object()
        status = request.data.get('status')
        
        if status not in dict(Task.STATUS_CHOICES):
            return Response(
                {'status': 'Invalid status value'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        task.status = status
        task.save()
        
        serializer = self.get_serializer(task)
        return Response(serializer.data)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()  # Add default queryset
    serializer_class = FeedbackSerializer
    permission_classes = [IsAuthenticated, IsTaskParticipant]
    
    def get_queryset(self):
        queryset = Feedback.objects.all()
        task_id = self.request.query_params.get('task_id', None)
        
        if task_id:
            queryset = queryset.filter(task_id=task_id)
        
        return queryset.select_related('author', 'task')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class UserListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        return queryset

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserProfileUpdateSerializer
        return UserProfileSerializer

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Resource.objects.all()
        participant_id = self.request.query_params.get('participant_id')
        if participant_id:
            queryset = queryset.filter(assigned_to_id=participant_id)
        return queryset

    @action(detail=True, methods=['patch'])
    def assign(self, request, pk=None):
        resource = self.get_object()
        participant_id = request.data.get('participant_id')
        try:
            participant = User.objects.get(id=participant_id, role='PARTICIPANT')
            resource.assigned_to = participant
            resource.status = 'IN_USE'
            resource.save()
            return Response(self.get_serializer(resource).data)
        except User.DoesNotExist:
            return Response({'error': 'Participant not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['patch'])
    def status(self, request, pk=None):
        resource = self.get_object()
        status_val = request.data.get('status')
        if status_val not in [choice[0] for choice in Resource.STATUS_CHOICES]:
            return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)
        resource.status = status_val
        if status_val == 'AVAILABLE':
            resource.assigned_to = None
        resource.save()
        return Response(self.get_serializer(resource).data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Project.objects.all()
        marketplace = self.request.query_params.get('marketplace')
        if marketplace:
            queryset = queryset.filter(status='PUBLISHED')
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        project = self.get_object()
        if project.status != 'PUBLISHED':
            return Response({'error': 'Project not available for purchase'}, status=status.HTTP_400_BAD_REQUEST)
        
        project.status = 'SOLD'
        project.buyer = request.user
        project.save()
        return Response(self.get_serializer(project).data)
