// Sidebar.jsx
import React from 'react';

const Sidebar = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li className="cursor-pointer hover:underline">Home</li>
        <li className="cursor-pointer hover:underline">Profile</li>
        <li className="cursor-pointer hover:underline">Settings</li>
        <li className="cursor-pointer hover:underline">Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;