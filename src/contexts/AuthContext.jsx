import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../utils/mockData.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('auction-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('auction-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0],
      verified: false,
      preferences: {
        language: 'en',
        currency: 'USD',
        notifications: true
      }
    };
    setUser(newUser);
    localStorage.setItem('auction-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auction-user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('auction-user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}