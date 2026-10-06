import React from 'react';
import { Navigation } from './Navigation';
import { DemoControlsDrawer } from '../demo/DemoControlsDrawer';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#1c1d1f] flex flex-col font-sans">
      <Navigation />
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <DemoControlsDrawer />
    </div>
  );
};
