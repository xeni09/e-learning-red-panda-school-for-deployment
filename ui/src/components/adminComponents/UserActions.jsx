import React from 'react';

const UserActions = ({ editingUserId, userId, handleSaveChanges, handleCancelEdit, handleEditClick, handleDeleteUser }) => {
  return editingUserId === userId ? (
    <>
      <button
        onClick={() => handleSaveChanges(userId)}
        className="btn px-4 py-2 rounded mr-2"
      >
        Save
      </button>
      <button
        onClick={handleCancelEdit}
        className="btn bg-gray-400  px-4 py-2 rounded"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={handleEditClick}
        className="btn px-4 py-2 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={handleDeleteUser}
        className="btn bg-red-600  px-4 py-2 rounded"
      >
        Delete
      </button>
    </>
  );
};

export default UserActions;
