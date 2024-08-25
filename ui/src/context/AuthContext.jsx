import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [isAuthenticated, user]);

  const login = (token) => {
    try {
      // Aquí se puede agregar lógica para decodificar el token si es necesario
      // Por ahora, simplemente almacenamos el token y un usuario ficticio
      const decodedUser = { name: "User", token }; // Usuario ficticio
      console.log('Logging in user:', decodedUser);
      setIsAuthenticated(true);
      setUser(decodedUser);
      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('user', JSON.stringify(decodedUser)); // Store the decoded user in localStorage
      localStorage.setItem('isAuthenticated', 'true'); // Ensure isAuthenticated is stored
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
    localStorage.removeItem('user'); // Remove the user from localStorage
    localStorage.setItem('isAuthenticated', 'false'); // Ensure isAuthenticated is updated
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;