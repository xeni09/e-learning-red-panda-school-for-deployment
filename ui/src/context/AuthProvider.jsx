import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from '../services/axiosConfig'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUserToken = async () => {
      // Verificar si el token existe en las cookies
      const tokenExists = document.cookie.includes('token');
      if (!tokenExists) {
        console.log("No token found, skipping verification");
        setIsLoading(false); // Asegúrate de que el loading termine si no hay token
        return;
      }
    
      try {
        const response = await axios.get('/api/auth/verifyToken');
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        if (error.response && error.response.status === 401) {
          handleInvalidToken();
        }
      } finally {
        setIsLoading(false);
      }
    };
    

    verifyUserToken();  // Trigger token verification when component mounts
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
      await axios.post('/api/auth/logout');  // Backend handles clearing cookies
      handleInvalidToken();  // Clear user data on successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // const updateUser = async () => {
  //   try {
  //     const response = await axios.get('/api/auth/verifyToken');
  //     if (response.data && response.data.user) {
  //       setUser(response.data.user);
  //       return response.data.user;
  //     } else {
  //       handleInvalidToken();  // If no user, clear session
  //     }
  //   } catch (error) {
  //     console.error('Failed to update user data:', error);
  //     handleInvalidToken();  // Treat failed verification as invalid token
  //   }
  // };

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
