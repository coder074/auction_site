import React, { useState } from 'react';
import { X, Bell, Check, Trash2, Settings, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function NotificationsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAuction();
  const [filterType, setFilterType] = useState('all');

  if (!isOpen) return null;

  const userNotifications = notifications.filter(n => n.userId === user?.id);
  const unreadNotifications = userNotifications.filter(n => !n.read);

  // Mock additional notifications for buyers
  const buyerNotifications = [
    {
      id: 'notif_buyer_1',
      userId: user?.id,
      type: 'bid_outbid',
      title: 'You\'ve been outbid!',
      message: 'Someone placed a higher bid on 2022 BMW M4 Competition. Current bid: $75,000',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      carId: '1',
      priority: 'high'
    },
    {
      id: 'notif_buyer_2',
      userId: user?.id,
      type: 'auction_ending',
      title: 'Auction ending soon',
      message: '2021 Porsche 911 Turbo S auction ends in 2 hours. You\'re currently winning!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      carId: '2',
      priority: 'high'
    },
    {
      id: 'notif_buyer_3',
      userId: user?.id,
      type: 'auction_won',
      title: 'Congratulations! You won an auction',
      message: 'You won the auction for 2020 Mercedes-AMG GT R with a bid of $152,000',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '3',
      priority: 'high'
    },
    {
      id: 'notif_buyer_4',
      userId: user?.id,
      type: 'watchlist_update',
      title: 'Watchlist item update',
      message: 'New bid placed on 2023 Lamborghini Huracán in your watchlist',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '4',
      priority: 'medium'
    },
    {
      id: 'notif_buyer_5',
      userId: user?.id,
      type: 'payment_reminder',
      title: 'Payment reminder',
      message: 'Payment for 2020 Mercedes-AMG GT R is due in 24 hours',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      read: false,
      carId: '3',
      priority: 'high'
    }
  ];

  const allNotifications = [...userNotifications, ...buyerNotifications].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const filteredNotifications = filterType === 'all' 
    ? allNotifications 
    : filterType === 'unread'
    ? allNotifications.filter(n => !n.read)
    : allNotifications.filter(n => n.type === filterType);

  const notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'bid_outbid', label: 'Bid Updates' },
    { value: 'auction_ending', label: 'Ending Soon' },
    { value: 'auction_won', label: 'Won Auctions' },
    { value: 'watchlist_update', label: 'Watchlist' },
    { value: 'payment_reminder', label: 'Payments' }
  ];

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'bid_outbid': return '🔴';
      case 'auction_ending': return '⏰';
      case 'auction_won': return '🏆';
      case 'watchlist_update': return '👁️';
      case 'payment_reminder': return '💳';
      case 'bid_placed': return '💰';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{t('notifications.title')}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {notificationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {unreadNotifications.length > 0 && (
                <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                  {unreadNotifications.length} unread
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {unreadNotifications.length > 0 && (
                <button
                  onClick={() => markAllNotificationsAsRead(user.id)}
                  className="text-sm text-orange-600 hover:text-orange-800"
                >
                  {t('notifications.mark.all.read')}
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-l-4 rounded-lg transition-colors ${
                  !notification.read ? 'bg-orange-50 border-l-orange-500' : 'bg-gray-50 border-l-gray-300'
                } ${getPriorityColor(notification.priority)} hover:bg-gray-100`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="p-1 text-orange-600 hover:bg-orange-100 rounded"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      className="p-1 text-gray-400 hover:bg-gray-200 rounded"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('notifications.no.new')}</h3>
              <p className="text-gray-600">
                {filterType === 'all' 
                  ? 'You\'re all caught up!' 
                  : `No ${filterType === 'unread' ? 'unread' : filterType.replace('_', ' ')} notifications`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}