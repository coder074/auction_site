import React, { useState } from 'react';
import { Heart, Clock, TrendingUp, Award, Eye, Gavel, Car, DollarSign, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';
import { MyBidsModal } from '../buyer/MyBidsModal.jsx';
import { PurchaseHistoryModal } from '../buyer/PurchaseHistoryModal.jsx';
import { NotificationsModal } from '../buyer/NotificationsModal.jsx';
import { AccountSettingsModal } from '../buyer/AccountSettingsModal.jsx';

export function BuyerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { getUserBids, getWatchlistCars, notifications } = useAuction();
  const [activeModal, setActiveModal] = useState(null);

  const userBids = user ? getUserBids(user.id) : [];
  const watchlistCars = user ? getWatchlistCars(user.id) : [];
  const activeBids = userBids.filter(bid => bid.car.status === 'active');
  const wonAuctions = userBids.filter(bid => bid.car.status === 'ended' && bid.isWinning);
  const unreadNotifications = user ? notifications.filter(n => n.userId === user.id && !n.read).length : 0;

  // Calculate total spent from won auctions
  const totalSpent = wonAuctions.reduce((sum, bid) => sum + bid.amount, 0);

  const stats = [
    {
      label: t('buyer.active.bids'),
      value: activeBids.length.toString(),
      change: '+2',
      icon: Gavel,
      color: 'bg-orange-100 text-orange-600',
      onClick: () => setActiveModal('bids')
    },
    {
      label: t('buyer.watching'),
      value: watchlistCars.length.toString(),
      change: '+3',
      icon: Eye,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: t('buyer.won.auctions'),
      value: wonAuctions.length.toString(),
      change: '+1',
      icon: Award,
      color: 'bg-orange-100 text-orange-600',
      onClick: () => setActiveModal('history')
    },
    {
      label: t('buyer.total.spent'),
      value: `$${Math.round(totalSpent / 1000)}K`,
      change: '+$45K',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const getTimeLeft = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return t('time.ended');
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const quickActions = [
    {
      icon: Gavel,
      label: 'My Bids',
      description: 'View all your active bids',
      onClick: () => setActiveModal('bids')
    },
    {
      icon: Award,
      label: 'Purchase History',
      description: 'View won auctions and purchases',
      onClick: () => setActiveModal('history')
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'View auction updates and alerts',
      onClick: () => setActiveModal('notifications'),
      badge: unreadNotifications > 0 ? unreadNotifications : null
    },
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Manage your dealer account',
      onClick: () => setActiveModal('settings')
    }
  ];

  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {user?.name}
        </h1>
        <p className="text-gray-600">Track your bids and discover new auction opportunities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${
              stat.onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
            }`}
            onClick={stat.onClick}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Active Bids */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Active Bids</h2>
              <button 
                onClick={() => setActiveModal('bids')}
                className="text-orange-600 hover:text-orange-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {activeBids.slice(0, 5).map((bid) => (
                <div key={bid.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={bid.car.images[0]}
                    alt={bid.car.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{bid.car.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>My bid: {formatCurrency(bid.amount)}</span>
                      <span>Current: {formatCurrency(bid.car.currentBid)}</span>
                      <span>Time: {getTimeLeft(bid.car.auctionEndTime)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bid.isWinning ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {bid.isWinning ? t('buyer.winning') : t('buyer.outbid')}
                    </span>
                  </div>
                </div>
              ))}
              {activeBids.length === 0 && (
                <div className="text-center py-8">
                  <Gavel className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No active bids</p>
                  <p className="text-sm text-gray-400 mt-1">Start bidding on auctions to see them here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Watchlist */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  onClick={action.onClick}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors text-left group relative"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className="w-6 h-6 text-orange-600 group-hover:text-orange-700" />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900 block">{action.label}</span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                    {action.badge && (
                      <span className="bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge > 9 ? '9+' : action.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Watchlist Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('buyer.watchlist')}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {watchlistCars.slice(0, 3).map((car) => (
                  <div key={car.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={car.images[0]}
                      alt={car.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{car.title}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                        <span>Current: {formatCurrency(car.currentBid)}</span>
                        <span>Time: {getTimeLeft(car.auctionEndTime)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-red-400 hover:text-red-600">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                ))}
                {watchlistCars.length === 0 && (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No items in watchlist</p>
                    <p className="text-sm text-gray-400 mt-1">Add vehicles to your watchlist to track them</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <MyBidsModal 
        isOpen={activeModal === 'bids'} 
        onClose={closeModal} 
      />
      <PurchaseHistoryModal 
        isOpen={activeModal === 'history'} 
        onClose={closeModal} 
      />
      <NotificationsModal 
        isOpen={activeModal === 'notifications'} 
        onClose={closeModal} 
      />
      <AccountSettingsModal 
        isOpen={activeModal === 'settings'} 
        onClose={closeModal} 
      />
    </div>
  );
}