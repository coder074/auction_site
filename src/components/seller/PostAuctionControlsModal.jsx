import React, { useState } from 'react';
import { X, Check, X as XIcon, RotateCcw, DollarSign, User, Calendar, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function PostAuctionControlsModal({ isOpen, onClose, auction }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cars } = useAuction();
  const [activeTab, setActiveTab] = useState('review');
  const [rejectReason, setRejectReason] = useState('');
  const [relistSettings, setRelistSettings] = useState({
    startingBid: auction?.currentBid || 0,
    reservePrice: auction?.reservePrice || 0,
    duration: 7,
    adjustments: ''
  });

  if (!isOpen || !auction) return null;

  const highestBid = auction.bids?.[auction.bids.length - 1];
  const hasReservePrice = auction.reservePrice && auction.reservePrice > 0;
  const reserveMet = hasReservePrice ? auction.currentBid >= auction.reservePrice : true;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const handleAcceptBid = () => {
    console.log('Accepting highest bid for auction:', auction.id);
    // Implementation for accepting bid
    onClose();
  };

  const handleRejectBid = () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejecting the bid');
      return;
    }
    console.log('Rejecting highest bid for auction:', auction.id, 'Reason:', rejectReason);
    // Implementation for rejecting bid
    onClose();
  };

  const handleRelistAuction = () => {
    console.log('Relisting auction:', auction.id, 'Settings:', relistSettings);
    // Implementation for relisting auction
    onClose();
  };

  const tabs = [
    { id: 'review', label: 'Review Bids' },
    { id: 'reject', label: 'Reject Bid' },
    { id: 'relist', label: 'Relist Vehicle' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Post-Auction Controls</h2>
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
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Auction Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Auction Summary</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Vehicle:</span>
                  <p className="font-medium">{auction.title}</p>
                </div>
                <div>
                  <span className="text-gray-600">Ended:</span>
                  <p className="font-medium">{new Date(auction.auctionEndTime).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total Bids:</span>
                  <p className="font-medium">{auction.bids?.length || 0}</p>
                </div>
                <div>
                  <span className="text-gray-600">Highest Bid:</span>
                  <p className="font-medium">{formatCurrency(auction.currentBid)}</p>
                </div>
                {hasReservePrice && (
                  <div>
                    <span className="text-gray-600">Reserve:</span>
                    <p className={`font-medium ${reserveMet ? 'text-green-600' : 'text-red-600'}`}>
                      {reserveMet ? 'Met' : 'Not Met'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'review' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Review Final Bids</h3>
                
                {/* Vehicle Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={auction.images[0]}
                      alt={auction.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{auction.title}</h4>
                      <p className="text-sm text-gray-600">{auction.year} • {auction.mileage.toLocaleString()} miles</p>
                      <p className="text-sm text-gray-600">Location: {auction.location}</p>
                    </div>
                  </div>
                </div>

                {/* Highest Bid Details */}
                {highestBid ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Winning Bid</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">Bid Amount</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(highestBid.amount)}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-700">Winning Bidder</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">{highestBid.bidderName}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-700">Bid Time</span>
                        </div>
                        <p className="text-gray-900">{new Date(highestBid.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Check className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-medium text-gray-700">Status</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reserveMet ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                      <button
                        onClick={handleAcceptBid}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        <Check className="w-5 h-5" />
                        <span>Accept Bid</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('reject')}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XIcon className="w-5 h-5" />
                        <span>Reject Bid</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-8 rounded-lg text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Bids Received</h4>
                    <p className="text-gray-600 mb-4">This auction ended without any bids.</p>
                    <button
                      onClick={() => setActiveTab('relist')}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Relist Vehicle
                    </button>
                  </div>
                )}

                {/* All Bids History */}
                {auction.bids && auction.bids.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">All Bids</h4>
                    <div className="space-y-3">
                      {auction.bids.slice().reverse().map((bid, index) => (
                        <div key={bid.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{bid.bidderName}</p>
                            <p className="text-sm text-gray-600">{new Date(bid.timestamp).toLocaleString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900">{formatCurrency(bid.amount)}</p>
                            {index === 0 && (
                              <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                                Winning Bid
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reject' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Reject Highest Bid</h3>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> Rejecting the highest bid will end this auction without a sale. 
                    You can choose to relist the vehicle with different settings.
                  </p>
                </div>

                {highestBid && (
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Bid to Reject</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900">{highestBid.bidderName}</p>
                        <p className="text-sm text-gray-600">{new Date(highestBid.timestamp).toLocaleString()}</p>
                      </div>
                      <p className="text-xl font-bold text-gray-900">{formatCurrency(highestBid.amount)}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Rejection *
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Please provide a reason for rejecting this bid..."
                    required
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('review')}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRejectBid}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject Bid
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'relist' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Relist Vehicle</h3>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Relisting will create a new auction for this vehicle. You can adjust the starting bid, 
                    reserve price, and auction duration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Starting Bid
                    </label>
                    <input
                      type="number"
                      value={relistSettings.startingBid}
                      onChange={(e) => setRelistSettings(prev => ({ ...prev, startingBid: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reserve Price (Optional)
                    </label>
                    <input
                      type="number"
                      value={relistSettings.reservePrice}
                      onChange={(e) => setRelistSettings(prev => ({ ...prev, reservePrice: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auction Duration
                    </label>
                    <select
                      value={relistSettings.duration}
                      onChange={(e) => setRelistSettings(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={3}>3 days</option>
                      <option value={5}>5 days</option>
                      <option value={7}>7 days</option>
                      <option value={10}>10 days</option>
                      <option value={14}>14 days</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adjustments/Notes (Optional)
                  </label>
                  <textarea
                    value={relistSettings.adjustments}
                    onChange={(e) => setRelistSettings(prev => ({ ...prev, adjustments: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Any adjustments or additional notes for the new listing..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab('review')}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRelistAuction}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Relist Vehicle</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}