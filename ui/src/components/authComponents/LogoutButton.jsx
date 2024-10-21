import React from 'react';
import { useAuth } from '../../context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    if (onClick) onClick();
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;