import React from 'react';
import UserRow from './UserRow';

const UserTable = ({ users, editingUserId, editFormData, setEditFormData, setEditingUserId, handleDeleteUser, handleSaveChanges, handleCancelEdit, handleSort, sortField, sortOrder }) => {

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
          <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('role')}>
            Role {renderSortIcon('role')}
          </th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow
            key={user._id}
            user={user}
            editingUserId={editingUserId}
            editFormData={editFormData}
            setEditFormData={setEditFormData}
            setEditingUserId={setEditingUserId}
            handleDeleteUser={handleDeleteUser}  
            handleSaveChanges={handleSaveChanges} 
            handleCancelEdit={handleCancelEdit}   
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;