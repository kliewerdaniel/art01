import React from 'react';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    assigned_to_username: string;
    assigned_by_username: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    due_date: string | null;
    created_at: string;
  };
  onStatusChange?: (newStatus: string) => void;
}

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span 
          className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{task.description}</p>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Assigned To:</p>
          <p className="font-medium">{task.assigned_to_username}</p>
        </div>
        <div>
          <p className="text-gray-500">Assigned By:</p>
          <p className="font-medium">{task.assigned_by_username}</p>
        </div>
        {task.due_date && (
          <div>
            <p className="text-gray-500">Due Date:</p>
            <p className="font-medium">{new Date(task.due_date).toLocaleDateString()}</p>
          </div>
        )}
        <div>
          <p className="text-gray-500">Created:</p>
          <p className="font-medium">{new Date(task.created_at).toLocaleDateString()}</p>
        </div>
      </div>
      
      {onStatusChange && (
        <div className="mt-4 pt-4 border-t">
          <label className="block text-sm font-medium text-gray-700">Update Status:</label>
          <select
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={task.status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      )}
    </div>
  );
};
