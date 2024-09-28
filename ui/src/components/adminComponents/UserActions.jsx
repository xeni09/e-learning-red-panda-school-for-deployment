import React from 'react';

const UserActions = ({ editingUserId, userId, handleSaveChanges, handleCancelEdit, handleEditClick, handleDeleteUser }) => {
  // Función para manejar la eliminación con confirmación
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      handleDeleteUser(userId);
    }
  };

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
        className="btn bg-gray-400 px-4 py-2 rounded"
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
        onClick={handleDelete}
        className="btn bg-red-600 px-4 py-2 rounded"
      >
        Delete
      </button>
    </>
  );
};

export default UserActions;
