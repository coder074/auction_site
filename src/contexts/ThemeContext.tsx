import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from '../types';
import { useAuth } from './AuthContext';

interface ThemeContextType {
  theme: Theme;
  getThemeClasses: () => string;
}

const themes: Record<string, Theme> = {
  admin: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-500',
    background: 'bg-gray-50',
    surface: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600'
  },
  seller: {
    primary: 'bg-emerald-600',
    secondary: 'bg-emerald-100',
    accent: 'bg-emerald-500',
    background: 'bg-gray-50',
    surface: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600'
  },
  buyer: {
    primary: 'bg-orange-600',
    secondary: 'bg-orange-100',
    accent: 'bg-orange-500',
    background: 'bg-gray-50',
    surface: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600'
  },
  default: {
    primary: 'bg-indigo-600',
    secondary: 'bg-indigo-100',
    accent: 'bg-indigo-500',
    background: 'bg-gray-50',
    surface: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const theme = themes[user?.role || 'default'];

  const getThemeClasses = () => {
    const role = user?.role || 'default';
    switch (role) {
      case 'admin':
        return 'text-blue-600 border-blue-200 hover:bg-blue-50';
      case 'seller':
        return 'text-emerald-600 border-emerald-200 hover:bg-emerald-50';
      case 'buyer':
        return 'text-orange-600 border-orange-200 hover:bg-orange-50';
      default:
        return 'text-indigo-600 border-indigo-200 hover:bg-indigo-50';
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, getThemeClasses }}>
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