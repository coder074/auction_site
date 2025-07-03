import React from 'react';
import { Clock, MapPin, Eye, TrendingUp, Gavel } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export function AuctionTableView({ cars, onViewDetails, onPlaceBid }) {
  const { t } = useLanguage();
  const { user } = useAuth();

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
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (car) => {
    const timeLeft = new Date(car.auctionEndTime) - new Date();
    if (timeLeft <= 0) return 'bg-gray-100 text-gray-800';
    if (timeLeft <= 60 * 60 * 1000) return 'bg-red-100 text-red-800'; // 1 hour
    if (timeLeft <= 24 * 60 * 60 * 1000) return 'bg-yellow-100 text-yellow-800'; // 24 hours
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Bid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bids
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time Left
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.map((car) => {
              const timeLeft = getTimeLeft(car.auctionEndTime);
              const statusColor = getStatusColor(car);
              
              return (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={car.images[0]}
                        alt={car.title}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {car.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {car.year} • {car.mileage.toLocaleString()} miles
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{car.engine || 'N/A'}</div>
                      <div className="text-gray-500">{car.transmission || 'N/A'}</div>
                      <div className="text-gray-500">{car.fuelType || 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(car.currentBid)}
                    </div>
                    {car.reservePrice && (
                      <div className={`text-xs ${
                        car.currentBid >= car.reservePrice 
                          ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        Reserve: {car.currentBid >= car.reservePrice ? 'Met' : 'Not Met'}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Gavel className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm font-medium text-gray-900">
                        {car.bids?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                      <Clock className="w-3 h-3 mr-1" />
                      {timeLeft}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {car.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onViewDetails(car)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      
                      {onPlaceBid && car.status === 'active' && user && user.role === 'buyer' && (
                        <button
                          onClick={() => onPlaceBid(car)}
                          className="text-orange-600 hover:text-orange-900 flex items-center space-x-1"
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>Bid</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}