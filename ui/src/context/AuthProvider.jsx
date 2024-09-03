import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import { getUserDataFromToken } from '../services/authService'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const loadUserData = async () => {
      if (token) {
        try {
          const data = await getUserDataFromToken(token);
          if (data && data.user) {
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false); // Finaliza la carga en todos los casos
    };

    loadUserData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated, user]);

  const login = async (token) => {
    const data = await getUserDataFromToken(token);
    if (data && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
