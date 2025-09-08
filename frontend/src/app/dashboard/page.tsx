'use client';

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      if (auth?.user) {
        try {
          const response = await axios.get(`http://localhost:8000/tasks/?participant_id=${auth.user.id}`);
          setTasks(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchTasks();
  }, [auth?.user]);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-white rounded shadow-md">
            <h2 className="mb-2 text-xl font-bold">{task.title}</h2>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">Status: {task.status}</p>
            <p>Due Date: {task.due_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
