import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from '../services/axiosConfig'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const response = await axios.get('/api/auth/verifyToken', { withCredentials: true });
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('User verification failed:', error);
        handleInvalidToken();
      } finally {
        setIsLoading(false);
      }
    };
  
    verifyUserToken();
  }, []);
  
  

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);  // Ensure the loading stops if token is invalid
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });  
      handleInvalidToken();  // Clear user data on successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  const updateUser = async () => {
    try {
      const response = await axios.get('/api/auth/verifyToken');
      if (response.data && response.data.user) {
        setUser(response.data.user);  // Actualiza el estado global de user
        return response.data.user;  // Asegura que devuelve el usuario actualizado
      } else {
        handleInvalidToken();  // Manejo del caso de token inválido
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
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
