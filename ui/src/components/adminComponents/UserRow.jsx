import React from 'react';

const UserRow = ({ user, editingUserId, editFormData, setEditFormData, setEditingUserId, handleDeleteUser, handleSaveChanges, handleCancelEdit }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{user._id}</td>
      <td className="border px-4 py-2">
        {editingUserId === user._id ? (
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleInputChange}
            placeholder="Enter new name"
            className="input mb-2 w-full p-2 border rounded"
          />
        ) : (
          user.name
        )}
      </td>
      <td className="border px-4 py-2">
        {editingUserId === user._id ? (
          <input
            type="email"
            name="email"
            value={editFormData.email}
            onChange={handleInputChange}
            placeholder="Enter new email"
            className="input mb-2 w-full p-2 border rounded"
          />
        ) : (
          user.email
        )}
      </td>
      <td className="border px-4 py-2">
        {editingUserId === user._id ? (
          <select
            name="role"
            value={editFormData.role}
            onChange={handleInputChange}
            className="input mb-2 w-full p-2 border rounded"
          >
            <option value="user">User</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          user.role
        )}
      </td>
      <td className="border px-4 py-2">
        {editingUserId === user._id ? (
          <>
            <button
              onClick={() => handleSaveChanges(user._id)}
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
              onClick={() => setEditingUserId(user._id)}
              className="btn bg-yellow-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteUser(user._id)}
              className="btn bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
