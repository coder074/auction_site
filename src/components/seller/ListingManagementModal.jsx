import React, { useState } from 'react';
import { X, Eye, Edit, Trash2, Play, Pause, RotateCcw, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function ListingManagementModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cars } = useAuction();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedListing, setSelectedListing] = useState(null);

  if (!isOpen) return null;

  const sellerCars = cars.filter(car => car.sellerId === user?.id);
  const activeCars = sellerCars.filter(car => car.status === 'active');
  const endedCars = sellerCars.filter(car => car.status === 'ended');
  const soldCars = sellerCars.filter(car => car.status === 'sold');
  const draftCars = sellerCars.filter(car => car.status === 'draft');

  const tabs = [
    { id: 'active', label: 'Active Auctions', count: activeCars.length },
    { id: 'ended', label: 'Ended Auctions', count: endedCars.length },
    { id: 'sold', label: 'Sold Vehicles', count: soldCars.length },
    { id: 'drafts', label: 'Drafts', count: draftCars.length }
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

  const getCarsToShow = () => {
    switch (activeTab) {
      case 'active': return activeCars;
      case 'ended': return endedCars;
      case 'sold': return soldCars;
      case 'drafts': return draftCars;
      default: return [];
    }
  };

  const handleEditListing = (listing) => {
    console.log('Edit listing:', listing.id);
    // Implementation for editing listing
  };

  const handleDeleteListing = (listing) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      console.log('Delete listing:', listing.id);
      // Implementation for deleting listing
    }
  };

  const handlePauseListing = (listing) => {
    console.log('Pause listing:', listing.id);
    // Implementation for pausing listing
  };

  const handleRelistVehicle = (listing) => {
    console.log('Relist vehicle:', listing.id);
    // Implementation for relisting vehicle
  };

  const handleAcceptBid = (listing) => {
    console.log('Accept highest bid for:', listing.id);
    // Implementation for accepting bid
  };

  const handleRejectBid = (listing) => {
    console.log('Reject highest bid for:', listing.id);
    // Implementation for rejecting bid
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Listing Management</h2>
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{tab.label}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Listings:</span>
                  <span className="font-medium">{sellerCars.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium">
                    {sellerCars.length > 0 ? Math.round((soldCars.length / sellerCars.length) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-medium">
                    {formatCurrency(soldCars.reduce((sum, car) => sum + car.currentBid, 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {getCarsToShow().map((listing) => (
                <div key={listing.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'active' ? 'bg-green-100 text-green-800' :
                          listing.status === 'ended' ? 'bg-yellow-100 text-yellow-800' :
                          listing.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Current Bid:</span>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(listing.currentBid)}</p>
                        </div>
                        <div>
                          <span className="font-medium">Total Bids:</span>
                          <p className="text-lg font-bold text-gray-900">{listing.bids?.length || 0}</p>
                        </div>
                        <div>
                          <span className="font-medium">
                            {listing.status === 'active' ? 'Time Left:' : 'Ended:'}
                          </span>
                          <p className="text-lg font-bold text-gray-900">
                            {listing.status === 'active' ? getTimeLeft(listing.auctionEndTime) : 
                             new Date(listing.auctionEndTime).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">Views:</span>
                          <p className="text-lg font-bold text-gray-900">{Math.floor(Math.random() * 500) + 100}</p>
                        </div>
                      </div>

                      {listing.reservePrice && (
                        <div className="mb-3 text-sm">
                          <span className="font-medium">Reserve Price:</span>
                          <span className={`ml-2 ${
                            listing.currentBid >= listing.reservePrice 
                              ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {formatCurrency(listing.reservePrice)} 
                            {listing.currentBid >= listing.reservePrice ? ' (Met)' : ' (Not Met)'}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Listed: {new Date(listing.auctionStartTime).toLocaleDateString()}</span>
                        <span>Location: {listing.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button 
                        onClick={() => setSelectedListing(listing)}
                        className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                      
                      {listing.status === 'active' && (
                        <>
                          <button 
                            onClick={() => handleEditListing(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button 
                            onClick={() => handlePauseListing(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-orange-600 hover:bg-orange-50 rounded text-sm"
                          >
                            <Pause className="w-4 h-4" />
                            <span>Pause</span>
                          </button>
                        </>
                      )}

                      {listing.status === 'ended' && listing.bids?.length > 0 && (
                        <>
                          <button 
                            onClick={() => handleAcceptBid(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-green-600 hover:bg-green-50 rounded text-sm"
                          >
                            <TrendingUp className="w-4 h-4" />
                            <span>Accept Bid</span>
                          </button>
                          <button 
                            onClick={() => handleRejectBid(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                          >
                            <X className="w-4 h-4" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}

                      {(listing.status === 'ended' || listing.status === 'sold') && (
                        <button 
                          onClick={() => handleRelistVehicle(listing)}
                          className="flex items-center space-x-1 px-3 py-1 text-emerald-600 hover:bg-emerald-50 rounded text-sm"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Relist</span>
                        </button>
                      )}

                      {listing.status === 'draft' && (
                        <>
                          <button 
                            onClick={() => handleEditListing(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Complete</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteListing(listing)}
                            className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {getCarsToShow().length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === 'active' ? 'No active auctions' :
                     activeTab === 'ended' ? 'No ended auctions' :
                     activeTab === 'sold' ? 'No sold vehicles' : 'No draft listings'}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === 'active' ? 'Create a new listing to start selling' :
                     activeTab === 'ended' ? 'Your ended auctions will appear here' :
                     activeTab === 'sold' ? 'Your sold vehicles will appear here' :
                     'Your draft listings will appear here'}
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