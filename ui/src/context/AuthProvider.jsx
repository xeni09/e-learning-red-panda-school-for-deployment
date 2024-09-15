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
        // Token is assumed to be in cookies (managed by backend)
        const response = await axios.get('/api/auth/verifyToken');  
        if (response.data && response.data.user) {
          // User successfully authenticated, store user and authentication state
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          // If no user is returned, handle invalid token
          handleInvalidToken();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        // Only log out on token-related errors (401)
        if (error.response && error.response.status === 401) {
          handleInvalidToken();
        }
      } finally {
        setIsLoading(false);  // Stop loading after verification attempt
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

  const updateUser = async () => {
    try {
      const response = await axios.get('/api/auth/verifyToken');
      if (response.data && response.data.user) {
        setUser(response.data.user);  // Update user data if token is valid
      } else {
        handleInvalidToken();  // If no user, clear session
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
      handleInvalidToken();  // Treat failed verification as invalid token
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
