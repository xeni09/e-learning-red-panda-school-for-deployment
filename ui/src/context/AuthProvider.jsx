import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from '../services/axiosConfig';  // Use your axios instance

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const response = await axios.get('/api/auth/verifyToken');  // Call your backend to verify the token
        if (response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        handleInvalidToken();
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    verifyUserToken();  // Automatically verify the token when the component mounts
  }, []);

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
      await axios.post('/api/auth/logout');  // Logout request to backend
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.get('/api/auth/verifyToken');  // Call the token verification endpoint to refresh user data
      if (response.data.user) {
        setUser(response.data.user);  // Update user data in the state
      } else {
        handleInvalidToken();
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
