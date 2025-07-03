import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, LogOut, Menu, X, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { LanguageSwitcher } from './LanguageSwitcher.jsx';
import { NotificationDropdown } from './NotificationDropdown.jsx';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { getRoleColor, getRoleBg } = useTheme();
  const { notifications } = useAuction();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const unreadCount = user ? notifications.filter(n => n.userId === user.id && !n.read).length : 0;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
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
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className={`absolute -top-1 -right-1 ${getRoleBg()} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center`}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifications && (
                    <NotificationDropdown onClose={() => setShowNotifications(false)} />
                  )}
                </div>

                {/* User Info */}
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
                  className={`px-4 py-2 rounded-lg font-medium text-white transition-colors ${getRoleBg()} hover:opacity-90`}
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
                    className={`px-4 py-2 rounded-lg font-medium text-white transition-colors text-center ${getRoleBg()} hover:opacity-90`}
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