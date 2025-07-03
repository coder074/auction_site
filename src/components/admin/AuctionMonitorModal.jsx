import React, { useState } from 'react';
import { X, Clock, TrendingUp, Eye, Gavel, AlertTriangle, DollarSign } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function AuctionMonitorModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { cars } = useAuction();
  const [selectedAuction, setSelectedAuction] = useState(null);

  if (!isOpen) return null;

  const activeAuctions = cars.filter(car => car.status === 'active');
  const endingSoonAuctions = activeAuctions.filter(car => {
    const timeLeft = new Date(car.auctionEndTime) - new Date();
    return timeLeft <= 24 * 60 * 60 * 1000; // 24 hours
  });

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
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getAuctionStatus = (car) => {
    const timeLeft = new Date(car.auctionEndTime) - new Date();
    const hasReserve = car.reservePrice && car.currentBid < car.reservePrice;
    
    if (timeLeft <= 0) return { status: 'ended', color: 'bg-gray-100 text-gray-800' };
    if (timeLeft <= 60 * 60 * 1000) return { status: 'ending soon', color: 'bg-red-100 text-red-800' };
    if (hasReserve) return { status: 'reserve not met', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'active', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Live Auction Monitor</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Gavel className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Active Auctions</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">{activeAuctions.length}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-900">Ending Soon</span>
              </div>
              <p className="text-2xl font-bold text-red-900 mt-1">{endingSoonAuctions.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Total Bids</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">
                {activeAuctions.reduce((sum, car) => sum + (car.bids?.length || 0), 0)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Total Value</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">
                {formatCurrency(activeAuctions.reduce((sum, car) => sum + car.currentBid, 0))}
              </p>
            </div>
          </div>

          {/* Auction List */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Active Auctions</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activeAuctions.map((auction) => {
                const auctionStatus = getAuctionStatus(auction);
                const timeLeft = getTimeLeft(auction.auctionEndTime);
                
                return (
                  <div key={auction.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={auction.images[0]}
                        alt={auction.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{auction.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${auctionStatus.color}`}>
                            {auctionStatus.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Current Bid:</span>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(auction.currentBid)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Bids:</span>
                            <p className="text-lg font-bold text-gray-900">{auction.bids?.length || 0}</p>
                          </div>
                          <div>
                            <span className="font-medium">Time Left:</span>
                            <p className={`text-lg font-bold ${
                              timeLeft.includes('m') && !timeLeft.includes('h') && !timeLeft.includes('d') 
                                ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {timeLeft}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Seller:</span>
                            <p className="text-gray-900">{auction.sellerName}</p>
                          </div>
                        </div>

                        {auction.reservePrice && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Reserve Price:</span>
                            <span className={`ml-2 ${
                              auction.currentBid >= auction.reservePrice 
                                ? 'text-green-600' : 'text-orange-600'
                            }`}>
                              {formatCurrency(auction.reservePrice)} 
                              {auction.currentBid >= auction.reservePrice ? ' (Met)' : ' (Not Met)'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button 
                          onClick={() => setSelectedAuction(auction)}
                          className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        
                        {timeLeft.includes('m') && !timeLeft.includes('h') && !timeLeft.includes('d') && (
                          <div className="flex items-center space-x-1 text-red-600 text-sm">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Urgent</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Bid Activity */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bid Activity</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {activeAuctions
                .flatMap(car => 
                  (car.bids || []).map(bid => ({ ...bid, carTitle: car.title, carId: car.id }))
                )
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .slice(0, 10)
                .map((bid, index) => (
                  <div key={`${bid.carId}-${bid.id}-${index}`} className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{bid.bidderName}</p>
                        <p className="text-sm text-gray-600">bid {formatCurrency(bid.amount)} on {bid.carTitle}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(bid.amount)}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}