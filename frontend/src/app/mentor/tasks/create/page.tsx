'use client';

import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '../../../../context/AuthContext';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/tasks/', {
        title,
        description,
        assigned_to: assignedTo,
        assigned_by: auth?.user.id,
        due_date: dueDate,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="mb-4 text-2xl font-bold">Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          placeholder="Assign to (User ID)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
}
