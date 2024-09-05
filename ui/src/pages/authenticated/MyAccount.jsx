import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubMenu from './SubMenu';
import { useAuth } from '../../context/AuthProvider';

const MyAccount = () => {
  const { user, updateUser, isAuthenticated, isLoading } = useAuth();  // Directamente desde el contexto
  const navigate = useNavigate();

  // useEffect para verificar autenticación y cargar datos del usuario
  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (isAuthenticated && !user) {
        await updateUser();
      } else if (!isAuthenticated && !isLoading) {
        navigate('/login');
      }
    };
  
    fetchUpdatedUser();
  }, [isAuthenticated, isLoading, user, updateUser, navigate]);
  
  // Mostrar loading mientras los datos del usuario se están cargando
  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Your Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {user.name}!</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-6"><strong>Email:</strong> {user.email}</p>
          <Link to="/settings" className="btn">Edit Your Information</Link>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
