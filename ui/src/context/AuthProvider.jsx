import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { getUserDataFromToken } from '../services/authService'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
            handleInvalidToken();  
          }
        } catch (error) {
          console.error("Failed to load user data:", error);
          handleInvalidToken();
        }
      } else {
        handleInvalidToken();
      }
      setIsLoading(false); 
    };

    loadUserData();
  }, []);

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');  
  };

  const login = async (token) => {
    const data = await getUserDataFromToken(token);
    if (data && data.user) {
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', token);
    } else {
      handleInvalidToken();
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  const updateUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const data = await getUserDataFromToken(token);
        if (data && data.user) {
          setUser(data.user);  // Actualiza el estado global con los datos más recientes
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error("Failed to update user data:", error);
      }
    }
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
