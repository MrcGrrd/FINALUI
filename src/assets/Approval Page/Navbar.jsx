import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md h-16 flex items-center justify-between px-4">
      <div className="font-semibold text-xl">Patient Queue</div>
      <div className="flex items-center">
        <span className="mr-2">Alexander Arnold</span>
        {/* Profile dropdown */}
      </div>
    </div>
  );
};

export default Navbar;
