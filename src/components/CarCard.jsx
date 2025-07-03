import React from 'react';
import { Clock, MapPin, Eye, TrendingUp, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function CarCard({ car, onViewDetails, onPlaceBid }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useAuction();
  const { getRoleBg } = useTheme();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const getTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(car.auctionEndTime);
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return t('time.ended');
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = () => {
    switch (car.status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'ending-soon': return 'bg-yellow-100 text-yellow-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const handleWatchlistToggle = (e) => {
    e.stopPropagation();
    if (!user) return;

    if (isInWatchlist(user.id, car.id)) {
      removeFromWatchlist(user.id, car.id);
    } else {
      addToWatchlist(user.id, car.id);
    }
  };

  const isWatched = user ? isInWatchlist(user.id, car.id) : false;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={car.images[0]}
          alt={car.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1).replace('-', ' ')}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
            {car.bids?.length || 0} bids
          </div>
          {user && (
            <button
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-full transition-colors ${
                isWatched 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black bg-opacity-50 text-white hover:bg-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWatched ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{car.title}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-500">{t('bid.current')}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(car.currentBid)}</p>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{car.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{getTimeLeft()}</span>
          </div>
          <span>{car.year} • {car.mileage.toLocaleString()} miles</span>
        </div>

        {/* Reserve Price Indicator */}
        {car.reservePrice && (
          <div className="mb-4">
            <div className={`text-xs px-2 py-1 rounded ${
              car.currentBid >= car.reservePrice 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              {car.currentBid >= car.reservePrice ? t('bid.reserve.met') : t('bid.reserve.not.met')}
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails(car)}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>{t('common.view')}</span>
          </button>
          
          {onPlaceBid && car.status === 'active' && user && user.role === 'buyer' && (
            <button
              onClick={() => onPlaceBid(car)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${getRoleBg()} hover:opacity-90`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t('bid.place')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}