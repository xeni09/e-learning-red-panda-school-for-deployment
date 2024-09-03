import React, { useContext, useEffect, useState } from 'react';
import { getUserDataFromToken, updateUserData } from '../../services/authService';
import AuthContext from '../../context/AuthContext';
import SubMenu from './SubMenu';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        console.log('User from AuthContext:', user);
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const data = await getUserDataFromToken(user.id, token);
            setFetchedUser(data);
            setEditedName(data?.user?.name || user?.name || '');
            console.log('Fetched User:', data);
          } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err);
          } finally {
            setLoading(false);
          }
        } else {
          console.error('No token found in localStorage');
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleEditClick = () => {
    if (isEditingName) {
      handleSaveClick();
    } else {
      setIsEditingName(true);
    }
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    if (token && user) {
      try {
        const updatedUser = await updateUserData(user.id, { name: editedName }, token);
        setFetchedUser(updatedUser);
        setIsEditingName(false);
      } catch (err) {
        console.error('Error updating user data:', err);
        setError(err);
      }
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user data: {error.message}</div>;
  }

  return (
    <>
    <SubMenu />

    <div className='container mx-auto p-4 pt-20'>
      <h1>Settings</h1>
      <p className='text-xl pb-6 pl-6'>Edit your account information here.</p>
      <form className="">
        <div className="px-6">
          <label className="label">Name:</label>
          <div className="control flex flex-col sm:flex-row items-start sm:items-center">
            <input
              className="field input mr-0 sm:mr-5 mb-2 sm:mb-0"
              type="text"
              value={editedName}
              onChange={handleNameChange}
              readOnly={!isEditingName}
            />
            <button type="button" onClick={handleEditClick} className="btn">
              {isEditingName ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="px-6">
          <label className="label">Email:</label>
          <div className="control flex flex-col sm:flex-row items-start sm:items-center">
            <input
              className="field input mr-0 sm:mr-5 mb-2 sm:mb-0"
              type="email"
              value={fetchedUser?.user?.email || user?.email || 'N/A'}
              readOnly
            />
            <button type="button" className="btn" disabled>
              Edit
            </button>
          </div>
        </div>
        <div className="px-6">
          <label className="label">Password:</label>
          <div className="control flex flex-col sm:flex-row items-start sm:items-center">
            <input
              className="field input mr-0 sm:mr-5 mb-2 sm:mb-0"
              type="password"
              value="****"
              readOnly
            />
            <button type="button" className="btn" disabled>
              Edit
            </button>
          </div>
        </div>
        <div className="px-6">
          <label className="label">Repeat Password:</label>
          <div className="control flex flex-col sm:flex-row items-start sm:items-center">
            <input
              className="field input mr-0 sm:mr-5 mb-2 sm:mb-0"
              type="password"
              value="****"
              readOnly
            />
            <button type="button" className="btn" disabled>
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
    </>
  );
};

export default Settings;