import React from 'react';

const UserActions = ({ editingUserId, userId, handleSaveChanges, handleCancelEdit, handleEditClick, handleDeleteUser }) => {
  return editingUserId === userId ? (
    <>
      <button
        onClick={() => handleSaveChanges(userId)}
        className="btn bg-blue-600 text-white px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        onClick={handleCancelEdit}
        className="btn bg-gray-400 text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={handleEditClick}
        className="btn bg-yellow-500 text-white px-4 py-2 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDeleteUser}
        className="btn bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete
      </button>
    </>
  );
};

export default UserActions;
