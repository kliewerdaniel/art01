'use client';

import React from 'react';
import ProjectList from '@/features/projects/ProjectList';

const MarketplacePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Marketplace</h1>
      <ProjectList />
    </div>
  );
};

export default MarketplacePage;
