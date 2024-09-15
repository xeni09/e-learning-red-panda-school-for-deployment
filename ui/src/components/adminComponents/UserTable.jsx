import React from 'react';

const UserTable = ({
  users,
  editingUserId,
  editFormData,
  setEditFormData,
  setEditingUserId,
  handleDeleteUser,
  handleSaveChanges,
  handleCancelEdit,
  handleSort,
  sortField,
  sortOrder
}) => {

  const handleInputChange = (e, field) => {
    const { name, value } = e.target;
    setEditFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return '↑↓';
    }
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <table className="table-auto w-full mb-6">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
            Name {renderSortIcon('name')}
          </th>
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>
            Email {renderSortIcon('email')}
          </th>
          <th className="px-4 py-2 cursor-pointer min-w-[150px]" onClick={() => handleSort('role')}>
            Role {renderSortIcon('role')}
          </th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
              <tr key={user.customId}>  {/* Cambiar _id a customId */}
              <td className="border px-4 py-2">{user.customId}</td>  {/* Mostrar customId */}
              <td className="border px-4 py-2">
                {editingUserId === user.customId ? (
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) => handleInputChange(e)}
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
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Enter new email"
                  className="input mb-2 w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                user.email
              )}
            </td>
            <td className="border px-4 py-2 min-w-[150px]">
              {editingUserId === user._id ? (
                <select
                  name="role"
                  value={editFormData.role}
                  onChange={(e) => handleInputChange(e)}
                  className="input mb-2 w-full p-2 border border-gray-300 rounded"
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSaveChanges(user._id)}
                    className="btn px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="btn bg-[var(--color-grey)] px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingUserId(user._id)}
                    className="btn px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn bg-[var(--color-red)] px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;