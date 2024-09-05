import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenu from './SubMenu';
import AuthContext from '../../context/AuthContext';

const MyAccount = () => {
  const { user, updateUser, isLoading } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const fetchUpdatedUser = async () => {
      if (!localUser) {  // Evita llamadas repetitivas si los datos ya están actualizados
        await updateUser(); // Llama a updateUser solo al cargar si localUser es null
        setLocalUser(user); // Establece el estado local con los datos de usuario actualizados
      }
    };

    fetchUpdatedUser();  // Llamada cuando se monta el componente
  }, [updateUser, user, localUser]);  // Efecto se ejecuta solo si el user o localUser cambian

  if (isLoading || !localUser) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SubMenu />
      <div className="container mx-auto p-4 pt-20">
        <h2>Your Account</h2>
        <p className="mb-6 text-2xl">Welcome to your dashboard, {localUser?.name}!</p>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
          <p className="mb-2"><strong>Name:</strong> {localUser?.name}</p>
          <p className="mb-6"><strong>Email:</strong> {localUser?.email}</p>
          <Link to="/settings" className="btn">Edit Your Information</Link>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
