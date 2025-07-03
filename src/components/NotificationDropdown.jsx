import React from 'react';
import { Bell, X, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

export function NotificationDropdown({ onClose }) {
  const { user } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAuction();
  const { t } = useLanguage();

  const userNotifications = notifications.filter(n => n.userId === user?.id);
  const unreadNotifications = userNotifications.filter(n => !n.read);

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('notifications.title')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {unreadNotifications.length > 0 && (
            <button
              onClick={() => markAllNotificationsAsRead(user.id)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-2"
            >
              {t('notifications.mark.all.read')}
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {userNotifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>{t('notifications.no.new')}</p>
            </div>
          ) : (
            userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}