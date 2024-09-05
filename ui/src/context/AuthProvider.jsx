import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { getUserDataFromToken } from '../services/authService';
import axios from 'axios';  // Asegúrate de importar axios

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserDataFromToken();  // Obtener datos del usuario desde el token en cookies
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        handleInvalidToken();
      }
      setIsLoading(false);  // Dejar de cargar después de intentar obtener los datos
    };

    loadUserData();
  }, []);

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    console.log('User logged in:', userData);  // Verificar si se actualiza el estado global
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');  // Llama al backend para eliminar la cookie del token
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async () => {
    try {
      const userData = await getUserDataFromToken();  // Obtener datos actualizados del usuario desde el token en las cookies
      if (userData) {
        setUser(userData);  // Actualizar el estado global con los datos actualizados
      } else {
        handleInvalidToken();
      }
    } catch (error) {
      console.error("Failed to update user data:", error);
      handleInvalidToken();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
