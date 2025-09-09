from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils import timezone
from django.conf import settings

class User(AbstractUser):
    ROLE_CHOICES = (
        ('MENTOR', 'Mentor'),
        ('PARTICIPANT', 'Participant'),
        ('ADMIN', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    bio = models.TextField(blank=True)
    skills = models.JSONField(default=list)
    location = models.CharField(max_length=100, blank=True)
    experience_years = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

class Task(models.Model):
    STATUS_CHOICES = [
        ("PENDING", "Pending"),
        ("IN_PROGRESS", "In Progress"),
        ("COMPLETED", "Completed"),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    assigned_to = models.ForeignKey(User, related_name="tasks_assigned", on_delete=models.CASCADE)
    assigned_by = models.ForeignKey(User, related_name="tasks_created", on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="PENDING")
    due_date = models.DateField(null=True, blank=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} (assigned to: {self.assigned_to.username})"

class Feedback(models.Model):
    task = models.ForeignKey(Task, related_name="feedbacks", on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback for {self.task.title} by {self.author.username if self.author else 'deleted user'}"


class Resource(models.Model):
    RESOURCE_TYPES = [("BOOK", "Book"), ("TOOL", "Tool"), ("MATERIAL", "Material"), ("DIGITAL", "Digital")]
    STATUS_CHOICES = [("AVAILABLE", "Available"), ("IN_USE", "In Use"), ("RETURNED", "Returned")]
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    assigned_to = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="AVAILABLE")
    created_at = models.DateTimeField(auto_now_add=True)
