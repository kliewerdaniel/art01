'use client';

import React from 'react';
import TaskList from '@/features/tasks/TaskList';
import { useAuth } from '@/context/AuthContext';

const ParticipantDashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Tasks</h1>
      <TaskList participantId={user.id} />
    </div>
  );
};

export default ParticipantDashboardPage;
