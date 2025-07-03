import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext.jsx';

const themes = {
  admin: {
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-500',
    text: 'text-blue-600',
    border: 'border-blue-200',
    background: 'bg-blue-50',
    gradient: 'from-blue-600 to-blue-800'
  },
  seller: {
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    secondary: 'bg-emerald-100',
    accent: 'bg-emerald-500',
    text: 'text-emerald-600',
    border: 'border-emerald-200',
    background: 'bg-emerald-50',
    gradient: 'from-emerald-600 to-emerald-800'
  },
  buyer: {
    primary: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    secondary: 'bg-orange-100',
    accent: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-200',
    background: 'bg-orange-50',
    gradient: 'from-orange-600 to-orange-800'
  },
  default: {
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    secondary: 'bg-indigo-100',
    accent: 'bg-indigo-500',
    text: 'text-indigo-600',
    border: 'border-indigo-200',
    background: 'bg-indigo-50',
    gradient: 'from-indigo-600 to-indigo-800'
  }
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  const theme = themes[user?.role || 'default'];

  const getThemeClasses = () => {
    const role = user?.role || 'default';
    return themes[role];
  };

  const getRoleColor = () => {
    if (!user) return 'text-indigo-600';
    switch (user.role) {
      case 'admin': return 'text-blue-600';
      case 'seller': return 'text-emerald-600';
      case 'buyer': return 'text-orange-600';
      default: return 'text-indigo-600';
    }
  };

  const getRoleBg = () => {
    if (!user) return 'bg-indigo-600';
    switch (user.role) {
      case 'admin': return 'bg-blue-600';
      case 'seller': return 'bg-emerald-600';
      case 'buyer': return 'bg-orange-600';
      default: return 'bg-indigo-600';
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      getThemeClasses, 
      getRoleColor, 
      getRoleBg 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}