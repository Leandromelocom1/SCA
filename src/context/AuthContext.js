import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPermissions, setUserPermissions] = useState({});

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userPermissions, setUserPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};
