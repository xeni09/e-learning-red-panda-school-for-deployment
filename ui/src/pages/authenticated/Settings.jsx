import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import SubMenu from './SubMenu';
import EditableField from '../../components/EditableField'; // Componentes reutilizables
import useSettingsForm from '../../hooks/useSettingsForm';  // Hook personalizado para lógica

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const {
    isEditing, setIsEditing, editedName, setEditedName,
    editedEmail, setEditedEmail, editedPassword, setEditedPassword,
    repeatPassword, setRepeatPassword, loading, error, success,
    saveChanges, cancelEdit
  } = useSettingsForm(user, updateUser);

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h1>Settings</h1>
        <p className="text-xl pb-6 pl-6">Edit your account information here.</p>

        <EditableField
          label="Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          isEditing={isEditing}
        />

        <EditableField
          label="Email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          isEditing={isEditing}
          type="email"
        />

        {/* Campos de contraseña */}
        <EditableField
          label="Password"
          value={editedPassword}
          onChange={(e) => setEditedPassword(e.target.value)}
          isEditing={isEditing}
          type="password"
        />

        <EditableField
          label="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          isEditing={isEditing}
          type="password"
        />

        <div className="px-6 mt-8 flex flex-col sm:flex-row justify-between">
          <button 
            type="button" 
            className="btn mb-2 sm:mb-0 sm:mr-2"
            onClick={isEditing ? saveChanges : () => setIsEditing(true)}>
            {isEditing ? (loading ? 'Saving...' : 'Save') : 'Edit'}
          </button>

          {isEditing && (
            <button 
              type="button" 
              className="btn bg-red-500 hover:bg-red-600"
              onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </>
  );
};

export default Settings;
