import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Muestra un indicador de carga mientras se verifica la autenticación
  if (isLoading) {
    return <p>Loading...</p>; // Podrías personalizar esto con un spinner o similar
  }

  // Si el usuario no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizar el contenido protegido
  return children;
};

export default ProtectedRoute;
