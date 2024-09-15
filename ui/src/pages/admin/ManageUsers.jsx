import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';
import SearchBar from '../../components/adminComponents/SearchBar';
import UserTable from '../../components/adminComponents/UserTable';
import ChangePasswordForm from '../../components/adminComponents/ChangePasswordForm';
import CreateUserForm from '../../components/adminComponents/CreateUserForm';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'user' });
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const roleOptions = [
    { value: '', label: 'All' },
    { value: 'user', label: 'User' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Admin' }
  ];

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

  const handleCreateUser = async (newUserData) => {
    try {
      const response = await axios.post("/api/users", newUserData);
      setUsers([...users, response.data]);  // Add new user to the list
      alert('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user.');
      // Return error to CreateUserForm
      return { error: 'Failed to create user. Please try again.' };
    }
  };

  const handlePasswordChange = async (userId, newPassword) => {
    try {
      const response = await axios.put(`/api/users/user/${userId}/change-password`, { newPassword });
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user.');
    }
  };

  const handleSaveChanges = async (userId) => {
    try {
      await axios.put(`/api/users/user/${userId}`, editFormData);
      setUsers(users.map(user => (user._id === userId ? { ...user, ...editFormData } : user)));
      setEditingUserId(null);  // Exit edit mode
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user.');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({ name: '', email: '', role: 'user' });
  };

  const toggleForm = (form) => {
    if (form === 'create') {
      setShowCreateUserForm(!showCreateUserForm);
      setShowChangePasswordForm(false);  // Close change password form
    } else if (form === 'password') {
      setShowChangePasswordForm(!showChangePasswordForm);
      setShowCreateUserForm(false);  // Close create user form
    }
  };

  const filteredUsers = users.filter(user => filterRole ? user.role === filterRole : true);
  const searchedUsers = filteredUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <h2 className="text-xl font-bold">User List</h2>

            <div className="flex items-center space-x-4 md:space-x-4">
              <label htmlFor="filterRole" className="mr-2 text-sm whitespace-nowrap">Filter by Role:</label>
              <CustomDropdown
                options={roleOptions}
                selectedOption={filterRole}
                onOptionSelect={setFilterRole}
                className="w-40 md:w-48"
              />
            </div>
          </div>

          
          <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
            <button
              className="btn"
              onClick={() => toggleForm('create')}
            >
              {showCreateUserForm ? 'Hide Create New User' : 'Create New User'}
            </button>

            <button
              className="btn"
              onClick={() => toggleForm('password')}
            >
              {showChangePasswordForm ? 'Hide Change Password' : 'Change User Password'}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Handle global errors */}

          {showChangePasswordForm && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
              <ChangePasswordForm onChangePassword={handlePasswordChange} />
            </div>
          )}

          {showCreateUserForm && (
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mb-6 shadow-md">
              <CreateUserForm onCreateUser={handleCreateUser} />
            </div>
          )}

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <UserTable
            users={searchedUsers}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            setEditingUserId={setEditingUserId}
            handleDeleteUser={handleDeleteUser}
            handleSaveChanges={handleSaveChanges}
            editingUserId={editingUserId}
            handleCancelEdit={handleCancelEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
