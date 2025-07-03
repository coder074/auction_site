import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { getThemeClasses } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getRoleColor = () => {
    if (!user) return 'text-indigo-600';
    switch (user.role) {
      case 'admin': return 'text-blue-600';
      case 'seller': return 'text-emerald-600';
      case 'buyer': return 'text-orange-600';
      default: return 'text-indigo-600';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Car className={`w-8 h-8 ${getRoleColor()}`} />
            <span className="text-xl font-bold text-gray-900">AuctionPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? `${getRoleColor()} border-b-2 border-current pb-4` 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.home')}
            </Link>
            
            <Link
              to="/auctions"
              className={`font-medium transition-colors ${
                isActive('/auctions') 
                  ? `${getRoleColor()} border-b-2 border-current pb-4` 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {t('nav.auctions')}
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={`font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? `${getRoleColor()} border-b-2 border-current pb-4` 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('nav.dashboard')}
              </Link>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className={`text-xs capitalize ${getRoleColor()}`}>{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg font-medium text-white transition-colors ${
                    user?.role === 'admin' ? 'bg-blue-600 hover:bg-blue-700' :
                    user?.role === 'seller' ? 'bg-emerald-600 hover:bg-emerald-700' :
                    user?.role === 'buyer' ? 'bg-orange-600 hover:bg-orange-700' :
                    'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-medium ${isActive('/') ? getRoleColor() : 'text-gray-600'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/auctions"
                className={`font-medium ${isActive('/auctions') ? getRoleColor() : 'text-gray-600'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.auctions')}
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className={`font-medium ${isActive('/dashboard') ? getRoleColor() : 'text-gray-600'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </Link>
              )}
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
              {user ? (
                <div className="pt-2">
                  <div className="flex items-center space-x-2 mb-4">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-400" />
                    )}
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className={`text-xs capitalize ${getRoleColor()}`}>{user.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 text-sm font-medium text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/login"
                    className="text-gray-600 font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-2 rounded-lg font-medium text-white transition-colors text-center ${
                      user?.role === 'admin' ? 'bg-blue-600 hover:bg-blue-700' :
                      user?.role === 'seller' ? 'bg-emerald-600 hover:bg-emerald-700' :
                      user?.role === 'buyer' ? 'bg-orange-600 hover:bg-orange-700' :
                      'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}