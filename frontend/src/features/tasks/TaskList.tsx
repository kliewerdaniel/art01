import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TaskCard } from './TaskCard';
import { useAuth } from '@/context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  assigned_to_username: string;
  assigned_by_username: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  due_date: string | null;
  created_at: string;
}

export const TaskList: React.FC<{ participantId?: string }> = ({ participantId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError('');
        const url = '/api/tasks/' + (participantId ? `?participant_id=${participantId}` : '');
        const response = await axios.get(url);
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [participantId]);

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      await axios.patch(`/api/tasks/${taskId}/status/`, { status: newStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus as Task['status'] } : task
      ));
    } catch (err) {
      console.error('Error updating task status:', err);
      // You might want to show an error toast/notification here
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStatusChange={
            // Only allow status changes if user is the assignee or a mentor/admin
            (user?.role === 'MENTOR' || user?.role === 'ADMIN' || task.assigned_to_username === user?.username)
              ? (newStatus) => handleStatusChange(task.id, newStatus)
              : undefined
          }
        />
      ))}
    </div>
  );
};
