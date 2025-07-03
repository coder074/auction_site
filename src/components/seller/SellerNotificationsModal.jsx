import React, { useState } from 'react';
import { X, Bell, Check, Trash2, Settings, Filter, Gavel, Clock, DollarSign, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function SellerNotificationsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useAuction();
  const [filterType, setFilterType] = useState('all');

  if (!isOpen) return null;

  // Mock seller-specific notifications
  const sellerNotifications = [
    {
      id: 'seller_notif_1',
      userId: user?.id,
      type: 'new_bid',
      title: 'New bid received!',
      message: 'Someone placed a bid of $75,000 on your 2022 BMW M4 Competition',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false,
      carId: '1',
      priority: 'high',
      actionRequired: false
    },
    {
      id: 'seller_notif_2',
      userId: user?.id,
      type: 'auction_ending',
      title: 'Auction ending in 2 hours',
      message: 'Your 2020 Mercedes-AMG GT R auction is ending soon. Current bid: $152,000',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      carId: '3',
      priority: 'high',
      actionRequired: false
    },
    {
      id: 'seller_notif_3',
      userId: user?.id,
      type: 'auction_ended',
      title: 'Auction ended - Action required',
      message: 'Your 2021 Porsche 911 Turbo S auction has ended. Please accept or reject the highest bid of $195,000',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      carId: '2',
      priority: 'urgent',
      actionRequired: true
    },
    {
      id: 'seller_notif_4',
      userId: user?.id,
      type: 'reserve_met',
      title: 'Reserve price met!',
      message: 'The reserve price for your 2022 BMW M4 Competition has been met with a bid of $72,500',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '1',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 'seller_notif_5',
      userId: user?.id,
      type: 'payment_received',
      title: 'Payment received',
      message: 'Payment of $152,000 has been received for your sold Mercedes-AMG GT R',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '3',
      priority: 'medium',
      actionRequired: false
    },
    {
      id: 'seller_notif_6',
      userId: user?.id,
      type: 'listing_approved',
      title: 'Listing approved',
      message: 'Your 2023 Lamborghini Huracán listing has been approved and is now live',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '4',
      priority: 'low',
      actionRequired: false
    },
    {
      id: 'seller_notif_7',
      userId: user?.id,
      type: 'reminder',
      title: 'Weekly performance report',
      message: 'Your weekly sales report is ready. You sold 2 vehicles this week for a total of $347,000',
      timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      read: false,
      priority: 'low',
      actionRequired: false
    },
    {
      id: 'seller_notif_8',
      userId: user?.id,
      type: 'bid_retracted',
      title: 'Bid retracted',
      message: 'A bidder has retracted their bid of $68,000 on your 2022 BMW M4 Competition',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      carId: '1',
      priority: 'medium',
      actionRequired: false
    }
  ];

  const allNotifications = [...notifications.filter(n => n.userId === user?.id), ...sellerNotifications]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const unreadNotifications = allNotifications.filter(n => !n.read);
  const actionRequiredNotifications = allNotifications.filter(n => n.actionRequired);

  const notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'action_required', label: 'Action Required' },
    { value: 'new_bid', label: 'New Bids' },
    { value: 'auction_ending', label: 'Ending Soon' },
    { value: 'auction_ended', label: 'Ended Auctions' },
    { value: 'payment_received', label: 'Payments' },
    { value: 'listing_approved', label: 'Listing Updates' }
  ];

  const filteredNotifications = filterType === 'all' 
    ? allNotifications 
    : filterType === 'unread'
    ? unreadNotifications
    : filterType === 'action_required'
    ? actionRequiredNotifications
    : allNotifications.filter(n => n.type === filterType);

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
      case 'new_bid': return <Gavel className="w-5 h-5 text-emerald-600" />;
      case 'auction_ending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'auction_ended': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'reserve_met': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'payment_received': return <DollarSign className="w-5 h-5 text-blue-600" />;
      case 'listing_approved': return <Check className="w-5 h-5 text-green-600" />;
      case 'reminder': return <Bell className="w-5 h-5 text-gray-600" />;
      case 'bid_retracted': return <X className="w-5 h-5 text-orange-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const handleTakeAction = (notification) => {
    console.log('Taking action for notification:', notification.id);
    // Implementation for taking action (e.g., accept/reject bid)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Seller Notifications</h2>
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
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {notificationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              
              <div className="flex items-center space-x-2">
                {unreadNotifications.length > 0 && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                    {unreadNotifications.length} unread
                  </span>
                )}
                {actionRequiredNotifications.length > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    {actionRequiredNotifications.length} action required
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {unreadNotifications.length > 0 && (
                <button
                  onClick={() => markAllNotificationsAsRead(user.id)}
                  className="text-sm text-emerald-600 hover:text-emerald-800"
                >
                  Mark all as read
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
                className={`p-4 border-l-4 rounded-lg transition-colors hover:bg-gray-100 ${
                  !notification.read ? getPriorityColor(notification.priority) : 'border-l-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        )}
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            Action Required
                          </span>
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
                    {notification.actionRequired && (
                      <button
                        onClick={() => handleTakeAction(notification)}
                        className="px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700"
                      >
                        Take Action
                      </button>
                    )}
                    
                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="p-1 text-emerald-600 hover:bg-emerald-100 rounded"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-600">
                {filterType === 'all' 
                  ? 'You\'re all caught up!' 
                  : `No ${filterType === 'unread' ? 'unread' : filterType.replace('_', ' ')} notifications`}
              </p>
            </div>
          )}

          {/* Quick Actions */}
          {actionRequiredNotifications.length > 0 && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-900 mb-2">
                {actionRequiredNotifications.length} action{actionRequiredNotifications.length > 1 ? 's' : ''} required
              </h3>
              <div className="space-y-2">
                {actionRequiredNotifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between text-sm">
                    <span className="text-red-800">{notification.title}</span>
                    <button
                      onClick={() => handleTakeAction(notification)}
                      className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                    >
                      Act Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}