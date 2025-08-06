import React from 'react';

const AssignmentsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AssignmentsLayout;