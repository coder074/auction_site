import React, { useState } from 'react';
import { Plus, Car, TrendingUp, Clock, DollarSign, Eye, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';
import { AddListingModal } from '../AddListingModal.jsx';

export function SellerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { cars } = useAuction();
  const [showAddListing, setShowAddListing] = useState(false);

  // Filter cars by seller
  const sellerCars = cars.filter(car => car.sellerId === user?.id);
  const activeCars = sellerCars.filter(car => car.status === 'active');
  const soldCars = sellerCars.filter(car => car.status === 'sold');

  const totalRevenue = soldCars.reduce((sum, car) => sum + car.currentBid, 0);
  const successRate = sellerCars.length > 0 ? Math.round((soldCars.length / sellerCars.length) * 100) : 0;

  const stats = [
    {
      label: t('seller.active.listings'),
      value: activeCars.length.toString(),
      change: '+2',
      icon: Car,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: t('seller.total.sales'),
      value: `$${Math.round(totalRevenue / 1000)}K`,
      change: '+15%',
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: t('seller.success.rate'),
      value: `${successRate}%`,
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: t('seller.avg.sale.time'),
      value: '4.2 days',
      change: '-0.5d',
      icon: Clock,
      color: 'bg-emerald-100 text-emerald-600'
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

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-gray-600">Manage your car listings and track your sales performance.</p>
        </div>
        <button 
          onClick={() => setShowAddListing(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>{t('seller.add.listing')}</span>
        </button>
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

      {/* My Listings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{t('seller.my.listings')}</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {sellerCars.map((listing) => (
              <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{listing.bids?.length || 0} bids</span>
                    {listing.status === 'active' ? (
                      <>
                        <span>Current: {formatCurrency(listing.currentBid)}</span>
                        <span>Time left: {getTimeLeft(listing.auctionEndTime)}</span>
                      </>
                    ) : listing.status === 'sold' ? (
                      <>
                        <span>Sold for: {formatCurrency(listing.currentBid)}</span>
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>Status: {listing.status}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800' : 
                    listing.status === 'sold' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  {listing.status === 'active' && (
                    <>
                      <button className="p-2 text-gray-400 hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {sellerCars.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-4">Start by creating your first car listing</p>
                <button 
                  onClick={() => setShowAddListing(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {t('seller.add.listing')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Listing Modal */}
      <AddListingModal 
        isOpen={showAddListing}
        onClose={() => setShowAddListing(false)}
      />
    </div>
  );
}