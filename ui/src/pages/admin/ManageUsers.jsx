import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId) => {
    try {
      await axios.put(`/api/users/${userId}`, { role: newRole });
      setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
      setEditingUserId(null);
      setNewRole('');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                {editingUserId === user._id ? (
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Enter new role"
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border px-4 py-2">
                {editingUserId === user._id ? (
                  <button onClick={() => handleRoleChange(user._id)} className="btn">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setEditingUserId(user._id)} className="btn">
                    Edit Role
                  </button>
                )}
                <button onClick={() => handleDeleteUser(user._id)} className="btn ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
