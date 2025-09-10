import React from 'react';
import { Project } from '@/types';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={project.media_url}
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${project.price.toFixed(2)}</span>
          <span className="text-gray-500 text-sm">By: {project.owner.username}</span>
        </div>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
          Purchase
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
