'use client';

import React from 'react';
import useSWR from 'swr';
import TaskCreateForm from '@/features/tasks/TaskCreateForm';
import { fetcher } from '@/lib/api';
import { User } from '@/types';

const MentorDashboardPage = () => {
  const { data: participants, error } = useSWR<User[]>('/api/users/?role=PARTICIPANT', fetcher);

  if (error) return <div>Failed to load participants</div>;
  if (!participants) return <div>Loading...</div>;

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Create a New Task</h1>
      <TaskCreateForm participants={participants} />
    </div>
  );
};

export default MentorDashboardPage;
