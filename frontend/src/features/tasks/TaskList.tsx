import React from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import TaskCard from './TaskCard';
import { Task } from '@/types';

const TaskList = ({ participantId }: { participantId: number }) => {
  const { data: tasks, error } = useSWR<Task[]>(`/api/tasks/?participant_id=${participantId}`, fetcher);

  if (error) return <div>Failed to load tasks</div>;
  if (!tasks) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
