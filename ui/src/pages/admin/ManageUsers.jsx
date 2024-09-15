import React, { useEffect, useState } from 'react';
import axios from '../../services/axiosConfig';
import AdminSubMenu from '../../components/adminComponents/AdminSubMenu';
import UserTable from '../../components/adminComponents/UserTable';
import SearchBar from '../../components/adminComponents/SearchBar';
import CustomDropdown from '../../components/adminComponents/CustomDropdown';  // Importa el dropdown personalizado

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: 'user' });
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

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

  // Filtrar por rol
  const filteredUsers = users.filter(user => filterRole ? user.role === filterRole : true);

  // Filtrar por búsqueda
  const searchedUsers = filteredUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenar usuarios
  const sortedUsers = searchedUsers.sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <AdminSubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <div className="bg-white shadow-md rounded-lg p-10 my-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <h2 className="text-xl font-bold">User List</h2>

            {/* Filtro por rol usando el dropdown personalizado */}
            <div className="flex items-center space-x-4 md:space-x-4">
  <label htmlFor="filterRole" className="mr-2 text-sm whitespace-nowrap">Filter by Role:</label>
  <CustomDropdown
    options={roleOptions}
    selectedOption={filterRole}
    onOptionSelect={setFilterRole}
    className="w-40 md:w-48"  // Ajustar el ancho para mobile y desktop
  />
</div>

          </div>

          {/* Barra de búsqueda */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {error && <p className="text-red-500">{error}</p>}

          <UserTable
            users={sortedUsers}
            editingUserId={editingUserId}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            setEditingUserId={setEditingUserId}
            handleDeleteUser={async (userId) => {
              try {
                await axios.delete(`/api/users/user/${userId}`);
                setUsers(users.filter(user => user._id !== userId));
              } catch (error) {
                console.error('Error deleting user:', error);
                setError('Failed to delete user.');
              }
            }}
            handleSaveChanges={async (userId) => {
              try {
                await axios.put(`/api/users/user/${userId}`, { ...editFormData });
                setUsers(users.map(user => (user._id === userId ? { ...user, ...editFormData } : user)));
                setEditingUserId(null);
              } catch (error) {
                console.error('Error updating user:', error);
                setError('Failed to update user.');
              }
            }}
            handleCancelEdit={() => setEditingUserId(null)}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
