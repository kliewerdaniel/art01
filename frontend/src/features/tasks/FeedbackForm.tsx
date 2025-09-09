'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/api';

interface FeedbackFormProps {
  taskId: number;
  onSuccess: () => void;
}

const FeedbackForm = ({ taskId, onSuccess }: FeedbackFormProps) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/feedback/', { ...data, task: taskId });
      reset();
      onSuccess();
    } catch (err) {
      setError('Failed to submit feedback');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
          Rating (1-5)
        </label>
        <input
          id="rating"
          type="number"
          min="1"
          max="5"
          {...register('rating', { required: true, valueAsNumber: true })}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          {...register('comment')}
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isLoading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
