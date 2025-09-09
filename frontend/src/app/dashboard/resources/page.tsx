"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

interface Resource {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
}

const ParticipantResourcesPage = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get(`/resources/?participant_id=${user?.id}`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    if (user?.id) {
      fetchResources();
    }
  }, [user?.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Resources</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-bold">{resource.name}</h3>
            <p>{resource.description}</p>
            <p>Type: {resource.type}</p>
            <p>Status: {resource.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantResourcesPage;
