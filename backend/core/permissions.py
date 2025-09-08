from rest_framework import permissions

class IsMentorOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role in ['MENTOR', 'ADMIN']
        )

class IsMentorOrOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role in ['MENTOR', 'ADMIN']:
            return True
        # For Task model
        if hasattr(obj, 'assigned_to'):
            return obj.assigned_to == request.user
        # For Feedback model
        if hasattr(obj, 'author'):
            return obj.author == request.user
        return False

class IsTaskParticipant(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
            
        # For creating feedback
        if request.method == 'POST':
            task_id = request.data.get('task')
            if not task_id:
                return False
            from .models import Task
            try:
                task = Task.objects.get(id=task_id)
                return (request.user == task.assigned_to or 
                       request.user == task.assigned_by)
            except Task.DoesNotExist:
                return False
                
        return True  # For other methods, base permission on has_object_permission

    def has_object_permission(self, request, view, obj):
        # For Feedback model
        if hasattr(obj, 'task'):
            return (request.user == obj.task.assigned_to or 
                   request.user == obj.task.assigned_by)
        return False
