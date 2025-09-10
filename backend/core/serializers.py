from rest_framework import serializers
from .models import User, Task, Feedback, Resource, Project
import cloudinary.uploader

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    assigned_to_username = serializers.CharField(source='assigned_to.username', read_only=True)
    assigned_by_username = serializers.CharField(source='assigned_by.username', read_only=True)

    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'assigned_to', 'assigned_to_username',
                 'assigned_by', 'assigned_by_username', 'status', 'due_date', 'created_at')

class FeedbackSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Feedback
        fields = ('id', 'task', 'author', 'author_username', 'rating', 'comment', 'created_at')
        extra_kwargs = {
            'rating': {'min_value': 1, 'max_value': 5}
        }

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'bio', 'skills', 'location', 'experience_years')

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('bio', 'skills', 'location', 'experience_years')

class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    buyer = serializers.ReadOnlyField(source='buyer.username')
    media = serializers.FileField(write_only=True, required=False)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'owner', 'media_url', 'status',
            'price', 'buyer', 'created_at', 'media'
        ]
        read_only_fields = ['media_url', 'status', 'buyer']

    def create(self, validated_data):
        media_file = validated_data.pop('media', None)
        if not media_file:
            raise serializers.ValidationError("A media file is required for project creation.")

        try:
            upload_result = cloudinary.uploader.upload(media_file, folder="art01_projects")
            validated_data['media_url'] = upload_result.get('secure_url')
        except Exception as e:
            raise serializers.ValidationError(f"Failed to upload media file: {e}")

        validated_data['owner'] = self.context['request'].user
        project = Project.objects.create(**validated_data)
        return project
