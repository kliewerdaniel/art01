from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Task, Feedback

class TaskAndFeedbackTests(APITestCase):
    def setUp(self):
        # Create mentor user
        self.mentor = User.objects.create_user(
            username='mentor1',
            email='mentor@example.com',
            password='testpass123',
            role='MENTOR'
        )
        
        # Create participant user
        self.participant = User.objects.create_user(
            username='participant1',
            email='participant@example.com',
            password='testpass123',
            role='PARTICIPANT'
        )
        
        # Create a task
        self.task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            assigned_to=self.participant,
            assigned_by=self.mentor,
            status='PENDING'
        )

    def test_mentor_can_create_task(self):
        """Test that a mentor can create a task"""
        self.client.force_authenticate(user=self.mentor)
        
        data = {
            'title': 'New Task',
            'description': 'Task Description',
            'assigned_to': self.participant.id,
            'status': 'PENDING'
        }
        
        response = self.client.post('/api/tasks/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)
        self.assertEqual(Task.objects.latest('id').title, 'New Task')

    def test_participant_cannot_create_task(self):
        """Test that a participant cannot create a task"""
        self.client.force_authenticate(user=self.participant)
        
        data = {
            'title': 'New Task',
            'description': 'Task Description',
            'assigned_to': self.participant.id,
            'status': 'PENDING'
        }
        
        response = self.client.post('/api/tasks/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_participant_task_list_filtering(self):
        """Test that tasks can be filtered by participant"""
        self.client.force_authenticate(user=self.mentor)
        
        # Create another participant and task
        participant2 = User.objects.create_user(
            username='participant2',
            email='participant2@example.com',
            password='testpass123',
            role='PARTICIPANT'
        )
        
        Task.objects.create(
            title='Another Task',
            description='Another Description',
            assigned_to=participant2,
            assigned_by=self.mentor,
            status='PENDING'
        )
        
        # Test filtering by first participant
        response = self.client.get(f'/api/tasks/?participant_id={self.participant.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Task')

    def test_feedback_creation(self):
        """Test feedback creation for a task"""
        self.client.force_authenticate(user=self.participant)
        
        data = {
            'task': self.task.id,
            'rating': 5,
            'comment': 'Great task!'
        }
        
        response = self.client.post('/api/feedback/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Feedback.objects.count(), 1)
        self.assertEqual(Feedback.objects.first().rating, 5)
        self.assertEqual(Feedback.objects.first().comment, 'Great task!')

    def test_task_status_update(self):
        """Test updating task status"""
        self.client.force_authenticate(user=self.participant)
        
        response = self.client.patch(
            f'/api/tasks/{self.task.id}/status/',
            {'status': 'IN_PROGRESS'},
            format='json'
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.task.refresh_from_db()
        self.assertEqual(self.task.status, 'IN_PROGRESS')
