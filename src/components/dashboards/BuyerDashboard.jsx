import React from 'react';
import { Heart, Clock, TrendingUp, Award, Eye, Gavel } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function BuyerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { getUserBids, getWatchlistCars } = useAuction();

  const userBids = user ? getUserBids(user.id) : [];
  const watchlistCars = user ? getWatchlistCars(user.id) : [];

  const stats = [
    {
      label: 'Active Bids',
      value: userBids.filter(bid => bid.car.status === 'active').length.toString(),
      change: '+2',
      icon: Gavel,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: 'Watching',
      value: watchlistCars.length.toString(),
      change: '+3',
      icon: Eye,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: 'Won Auctions',
      value: '3',
      change: '+1',
      icon: Award,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: 'Total Spent',
      value: '$125K',
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
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

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
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Active Bids */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Active Bids</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userBids.filter(bid => bid.car.status === 'active').slice(0, 5).map((bid) => (
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
                      {bid.isWinning ? 'Winning' : 'Outbid'}
                    </span>
                  </div>
                </div>
              ))}
              {userBids.filter(bid => bid.car.status === 'active').length === 0 && (
                <p className="text-gray-500 text-center py-8">No active bids</p>
              )}
            </div>
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {watchlistCars.slice(0, 5).map((car) => (
                <div key={car.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="w-16 h-16 rounded-lg object-cover"
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
                    <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors">
                      Bid Now
                    </button>
                  </div>
                </div>
              ))}
              {watchlistCars.length === 0 && (
                <p className="text-gray-500 text-center py-8">No items in watchlist</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}