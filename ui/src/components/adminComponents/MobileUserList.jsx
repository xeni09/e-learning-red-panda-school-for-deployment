import React from 'react';

const MobileUserList = ({
  users,
  editingUserId,
  editFormData,
  setEditFormData,
  setEditingUserId,
  handleDeleteUser,
  handleSaveChanges,
  handleCancelEdit,
}) => {
  return (
    <div>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {users.map((user) => (
            <div key={user._id} className="bg-gray-100 p-4 rounded-md shadow-md">
              <p><strong>ID:</strong> {user._id}</p>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <div className="mt-4 flex justify-around">
                <button
                  className="btn bg-yellow-500 text-white mr-2"
                  onClick={() => setEditingUserId(user._id)}
                >
                  Edit
                </button>
                <button
                  className="btn bg-red-600 text-white"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileUserList;
