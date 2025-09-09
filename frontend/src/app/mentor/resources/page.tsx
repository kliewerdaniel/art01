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
  assigned_to: number | null;
}

interface User {
  id: number;
  username: string;
}

const MentorResourcesPage = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [participants, setParticipants] = useState<User[]>([]);
  const [newResource, setNewResource] = useState({ name: '', description: '', type: 'BOOK' });
  const [assigningResource, setAssigningResource] = useState<Resource | null>(null);
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);

  useEffect(() => {
    fetchResources();
    fetchParticipants();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources/');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const fetchParticipants = async () => {
    try {
      // This endpoint needs to be created in the backend
      const response = await api.get('/users/?role=PARTICIPANT');
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/resources/', newResource);
      setNewResource({ name: '', description: '', type: 'BOOK' });
      fetchResources();
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const handleAssignResource = async () => {
    if (!assigningResource || !selectedParticipant) return;
    try {
      await api.patch(`/resources/${assigningResource.id}/assign/`, { participant_id: selectedParticipant });
      setAssigningResource(null);
      setSelectedParticipant(null);
      fetchResources();
    } catch (error) {
      console.error('Error assigning resource:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Resources</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Resource</h2>
        <form onSubmit={handleCreateResource} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={newResource.description}
              onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              value={newResource.type}
              onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="BOOK">Book</option>
              <option value="TOOL">Tool</option>
              <option value="MATERIAL">Material</option>
              <option value="DIGITAL">Digital</option>
            </select>
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Resource
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">All Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <div key={resource.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="font-bold">{resource.name}</h3>
              <p>{resource.description}</p>
              <p>Type: {resource.type}</p>
              <p>Status: {resource.status}</p>
              {resource.status === 'AVAILABLE' && (
                <button
                  onClick={() => setAssigningResource(resource)}
                  className="mt-2 inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Assign
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {assigningResource && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4">Assign "{assigningResource.name}"</h3>
            <select
              onChange={(e) => setSelectedParticipant(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a participant</option>
              {participants.map((p) => (
                <option key={p.id} value={p.id}>{p.username}</option>
              ))}
            </select>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setAssigningResource(null)} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700">Cancel</button>
              <button onClick={handleAssignResource} className="py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700">Assign</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorResourcesPage;
