import React, { useState } from 'react';

const ChangePasswordForm = ({ onChangePassword }) => {
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(userId, newPassword);
  };

  return (
    <div className="mt-10">
      <p className="text-3xl font-bold mb-4">Change User Password</p>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 w-full"
      >
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 lg:mb-0 w-full lg:w-auto focus:outline-none focus:border-[var(--color-yellow)] transition"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 lg:mb-0 w-full lg:w-auto focus:outline-none focus:border-[var(--color-yellow)] transition"
        />
        <button
          type="submit"
          className="btn w-full lg:w-auto "
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
