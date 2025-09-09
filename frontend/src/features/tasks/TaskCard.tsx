import React from 'react';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-sm text-gray-500">Assigned by: {task.assigned_by_username}</p>
      <p className="mt-2">{task.description}</p>
      <div className="mt-4">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          task.status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
          task.status === 'IN_PROGRESS' ? 'bg-blue-200 text-blue-800' :
          'bg-green-200 text-green-800'
        }`}>
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
