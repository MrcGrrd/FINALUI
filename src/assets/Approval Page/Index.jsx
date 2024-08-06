import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ApprovalQueue from './ApprovalQueue';

function Index() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <ApprovalQueue />
      </div>
    </div>
  );
}

export default Index;
