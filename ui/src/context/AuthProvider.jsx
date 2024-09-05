import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { getUserDataFromToken } from '../services/authService';
import axios from '../services/axiosConfig';  // Asegúrate de importar Axios

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await getUserDataFromToken();  // Obtener datos del usuario desde las cookies
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
      setIsLoading(false);
    };

    loadUserData();
  }, []); // Solo se ejecuta una vez cuando el componente es montado

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');  // Eliminar el token del backend
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async () => {
    try {
      const userData = await getUserDataFromToken();  // Obtener datos actualizados desde las cookies
      if (userData) {
        setUser(userData);  // Actualizar los datos en el estado global
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
