import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';  // Asegúrate de usar tu configuración de axios
import AdminSubMenu from './AdminSubMenu';  // Submenú de administración

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'user' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleSaveChanges = async (userId) => {
    try {
      await axios.put(`/api/users/user/${userId}`, { ...editFormData });  // Cambia la URL
      setUsers(users.map(user => (user._id === userId ? { ...user, ...editFormData } : user)));
      setEditingUserId(null);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({ name: '', email: '', role: 'user' });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/user/${userId}`);  // Cambia la URL
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  return (
    <>
      <AdminSubMenu /> {/* Submenú en la parte superior */}
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <h2 className="text-2xl mb-4">Existing Users</h2>
          <table className="table-auto w-full mb-6">
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
                          onClick={() => handleEditClick(user)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
