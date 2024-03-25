// contexts/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(authService.isAuthenticated());
  }, []);

  const login = async (email, password) => {
    const success = await authService.login(email, password);
    setIsSignedIn(true);
  };
  const signup = async (username, password) => {
    const success = await authService.signup(username,  password);
    setIsSignedIn(success); // Update the state based on signup success
  };


  const logout = () => {
    authService.logout();
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, login,signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
