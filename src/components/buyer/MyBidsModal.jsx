import React, { useState } from 'react';
import { X, Gavel, Clock, TrendingUp, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function MyBidsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getUserBids } = useAuction();
  const [activeTab, setActiveTab] = useState('active');

  if (!isOpen) return null;

  const userBids = user ? getUserBids(user.id) : [];
  const activeBids = userBids.filter(bid => bid.car.status === 'active');
  const wonBids = userBids.filter(bid => bid.car.status === 'ended' && bid.isWinning);
  const lostBids = userBids.filter(bid => bid.car.status === 'ended' && !bid.isWinning);

  const tabs = [
    { id: 'active', label: 'Active Bids', count: activeBids.length },
    { id: 'won', label: 'Won Auctions', count: wonBids.length },
    { id: 'lost', label: 'Lost Auctions', count: lostBids.length }
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
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getBidsToShow = () => {
    switch (activeTab) {
      case 'active': return activeBids;
      case 'won': return wonBids;
      case 'lost': return lostBids;
      default: return [];
    }
  };

  const getBidStatus = (bid) => {
    if (bid.car.status === 'ended') {
      return bid.isWinning ? 'won' : 'lost';
    }
    return bid.isWinning ? 'winning' : 'outbid';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'winning': return 'bg-green-100 text-green-800';
      case 'outbid': return 'bg-red-100 text-red-800';
      case 'won': return 'bg-blue-100 text-blue-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'winning': return <TrendingUp className="w-4 h-4" />;
      case 'outbid': return <AlertTriangle className="w-4 h-4" />;
      case 'won': return <CheckCircle className="w-4 h-4" />;
      case 'lost': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Bids & Auctions</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tab.label}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bids:</span>
                  <span className="font-medium">{userBids.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium">
                    {userBids.length > 0 ? Math.round((wonBids.length / userBids.length) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent:</span>
                  <span className="font-medium">
                    {formatCurrency(wonBids.reduce((sum, bid) => sum + bid.amount, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {getBidsToShow().map((bid) => {
                const status = getBidStatus(bid);
                const timeLeft = getTimeLeft(bid.car.auctionEndTime);
                
                return (
                  <div key={bid.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={bid.car.images[0]}
                        alt={bid.car.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{bid.car.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(status)}`}>
                            {getStatusIcon(status)}
                            <span>{status === 'winning' ? t('buyer.winning') : 
                                   status === 'outbid' ? t('buyer.outbid') :
                                   status === 'won' ? 'Won' : 'Lost'}</span>
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">My Bid:</span>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(bid.amount)}</p>
                          </div>
                          <div>
                            <span className="font-medium">Current Bid:</span>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(bid.car.currentBid)}</p>
                          </div>
                          <div>
                            <span className="font-medium">
                              {bid.car.status === 'ended' ? 'Final Price:' : 'Time Left:'}
                            </span>
                            <p className={`text-lg font-bold ${
                              bid.car.status === 'ended' ? 'text-gray-900' :
                              timeLeft.includes('m') && !timeLeft.includes('h') && !timeLeft.includes('d') 
                                ? 'text-red-600' : 'text-gray-900'
                            }`}>
                              {bid.car.status === 'ended' ? formatCurrency(bid.car.currentBid) : timeLeft}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Bid Date:</span>
                            <p className="text-gray-900">{new Date(bid.timestamp).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Location: {bid.car.location}</span>
                          <span>Seller: {bid.car.sellerName}</span>
                          {bid.car.reservePrice && (
                            <span className={
                              bid.car.currentBid >= bid.car.reservePrice 
                                ? 'text-green-600' : 'text-orange-600'
                            }>
                              Reserve: {bid.car.currentBid >= bid.car.reservePrice ? 'Met' : 'Not Met'}
                            </span>
                          )}
                        </div>

                        {/* Action buttons for won auctions */}
                        {status === 'won' && (
                          <div className="mt-4 flex space-x-3">
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm">
                              Complete Purchase
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                              Contact Seller
                            </button>
                          </div>
                        )}

                        {/* Outbid alert for active auctions */}
                        {status === 'outbid' && (
                          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-sm text-red-800">
                                You've been outbid! Current bid is {formatCurrency(bid.car.currentBid)}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        
                        {status === 'outbid' && (
                          <button className="flex items-center space-x-1 px-3 py-1 text-orange-600 hover:bg-orange-50 rounded text-sm">
                            <Gavel className="w-4 h-4" />
                            <span>Bid Again</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {getBidsToShow().length === 0 && (
                <div className="text-center py-12">
                  <Gavel className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'active' ? 'No active bids' :
                     activeTab === 'won' ? 'No won auctions' : 'No lost auctions'}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'active' ? 'Start bidding on auctions to see them here' :
                     activeTab === 'won' ? 'Win some auctions to see your purchases here' :
                     'Your unsuccessful bids will appear here'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}