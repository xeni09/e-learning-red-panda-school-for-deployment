import React, { useContext, useState, useEffect } from 'react';
import { updateUserData } from '../../services/authService'; 
import AuthContext from '../../context/AuthContext';
import SubMenu from './SubMenu';

const Settings = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setEditedName(user.name);
    }
  }, [user]);

  const handleSaveClick = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const updatedUserData = { name: editedName };
      await updateUserData(user.id, updatedUserData, token);

      // Actualiza el estado global del usuario y sincroniza el cambio en la interfaz
      await updateUser(); // Recarga el usuario desde la base de datos

      setSuccess('Account updated successfully');
      setError(null);
    } catch (err) {
      setError('Failed to update account');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SubMenu />
      <div className='container mx-auto p-4 pt-20'>
        <h1>Settings</h1>
        <p className='text-xl pb-6 pl-6'>Edit your account information here.</p>

        <div className="px-6">
          <label className="label">Name:</label>
          <div className="control flex flex-col sm:flex-row items-start sm:items-center">
            <input
              className="field input mr-0 sm:mr-5 mb-2 sm:mb-0"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <button type="button" onClick={handleSaveClick} className="btn" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>
    </>
  );
};

export default Settings;
