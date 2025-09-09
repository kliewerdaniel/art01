'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { User } from '@/types';

interface TaskCreateFormProps {
  participants: User[];
}

const TaskCreateForm = ({ participants }: TaskCreateFormProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/tasks/', data);
      reset();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          {...register('title', { required: true })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="assigned_to" className="block text-sm font-medium text-gray-700">
          Assign To
        </label>
        <select
          id="assigned_to"
          {...register('assigned_to', { required: true })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        >
          {participants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          id="due_date"
          type="date"
          {...register('due_date')}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isLoading ? 'Creating...' : 'Create Task'}
      </button>
    </form>
  );
};

export default TaskCreateForm;
