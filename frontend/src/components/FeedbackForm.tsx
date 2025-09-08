'use client';

import { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

interface FeedbackFormProps {
  taskId: number;
}

export default function FeedbackForm({ taskId }: FeedbackFormProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/feedback/', {
        task: taskId,
        author: auth?.user.id,
        rating,
        comment,
      });
      // Optionally, refresh the feedback list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mt-4 bg-gray-100 rounded">
      <h3 className="mb-2 text-lg font-bold">Submit Feedback</h3>
      <div className="mb-2">
        <label htmlFor="rating" className="block mb-1">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="comment" className="block mb-1">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="p-2 text-white bg-blue-500 rounded">
        Submit
      </button>
    </form>
  );
}
