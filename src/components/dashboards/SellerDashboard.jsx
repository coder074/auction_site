import React, { useState } from 'react';
import { Plus, Car, TrendingUp, Clock, DollarSign, Eye, Edit, Trash2, Bell, BarChart3, Settings, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';
import { AddListingModal } from '../AddListingModal.jsx';
import { ListingManagementModal } from '../seller/ListingManagementModal.jsx';
import { SalesHistoryModal } from '../seller/SalesHistoryModal.jsx';
import { SellerAccountSettingsModal } from '../seller/SellerAccountSettingsModal.jsx';
import { SellerNotificationsModal } from '../seller/SellerNotificationsModal.jsx';
import { PostAuctionControlsModal } from '../seller/PostAuctionControlsModal.jsx';

export function SellerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { cars, notifications } = useAuction();
  const [showAddListing, setShowAddListing] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);

  // Filter cars by seller
  const sellerCars = cars.filter(car => car.sellerId === user?.id);
  const activeCars = sellerCars.filter(car => car.status === 'active');
  const endedCars = sellerCars.filter(car => car.status === 'ended');
  const soldCars = sellerCars.filter(car => car.status === 'sold');
  const draftCars = sellerCars.filter(car => car.status === 'draft');

  const totalRevenue = soldCars.reduce((sum, car) => sum + car.currentBid, 0);
  const successRate = sellerCars.length > 0 ? Math.round((soldCars.length / sellerCars.length) * 100) : 0;
  const averageSaleTime = 4.2; // Mock data

  // Get seller notifications
  const sellerNotifications = notifications.filter(n => n.userId === user?.id);
  const unreadNotifications = sellerNotifications.filter(n => !n.read);

  const stats = [
    {
      label: t('seller.active.listings'),
      value: activeCars.length.toString(),
      change: '+2',
      icon: Car,
      color: 'bg-emerald-100 text-emerald-600',
      onClick: () => setActiveModal('listings')
    },
    {
      label: t('seller.total.sales'),
      value: `$${Math.round(totalRevenue / 1000)}K`,
      change: '+15%',
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600',
      onClick: () => setActiveModal('sales')
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
      value: `${averageSaleTime} days`,
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

  const quickActions = [
    {
      icon: Plus,
      label: 'Add New Listing',
      description: 'Create a new vehicle auction',
      onClick: () => setShowAddListing(true),
      color: 'text-emerald-600'
    },
    {
      icon: Car,
      label: 'Manage Listings',
      description: 'View and edit your auctions',
      onClick: () => setActiveModal('listings'),
      color: 'text-emerald-600'
    },
    {
      icon: BarChart3,
      label: 'Sales History',
      description: 'View sales reports and analytics',
      onClick: () => setActiveModal('sales'),
      color: 'text-emerald-600'
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'View auction updates and alerts',
      onClick: () => setActiveModal('notifications'),
      color: 'text-emerald-600',
      badge: unreadNotifications.length > 0 ? unreadNotifications.length : null
    },
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Manage your dealer account',
      onClick: () => setActiveModal('settings'),
      color: 'text-emerald-600'
    },
    {
      icon: FileText,
      label: 'Documents',
      description: 'Manage business documents',
      onClick: () => setActiveModal('settings'),
      color: 'text-emerald-600'
    }
  ];

  const closeModal = () => {
    setActiveModal(null);
    setSelectedAuction(null);
  };

  const handlePostAuctionAction = (auction) => {
    setSelectedAuction(auction);
    setActiveModal('postAuction');
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

      {/* Alert for ended auctions requiring action */}
      {endedCars.length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                {endedCars.length} auction{endedCars.length > 1 ? 's' : ''} require your attention
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please review and accept or reject the highest bids.
              </p>
            </div>
            <button 
              onClick={() => setActiveModal('listings')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
            >
              Review Now
            </button>
          </div>
        </div>
      )}

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
        {/* My Listings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{t('seller.my.listings')}</h2>
              <button 
                onClick={() => setActiveModal('listings')}
                className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sellerCars.slice(0, 5).map((listing) => (
                <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{listing.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
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
                      ) : listing.status === 'ended' ? (
                        <>
                          <span>Highest bid: {formatCurrency(listing.currentBid)}</span>
                          <span className="text-yellow-600 font-medium">Action Required</span>
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
                      listing.status === 'ended' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {listing.status}
                    </span>
                    {listing.status === 'ended' && listing.bids?.length > 0 && (
                      <button
                        onClick={() => handlePostAuctionAction(listing)}
                        className="px-2 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                      >
                        Review
                      </button>
                    )}
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

        {/* Quick Actions & Performance */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.quick.actions')}</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  onClick={action.onClick}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors text-left group relative"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-6 h-6 ${action.color} group-hover:text-emerald-700`} />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900 block">{action.label}</span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                    {action.badge && (
                      <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {action.badge > 9 ? '9+' : action.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="font-semibold text-gray-900">{soldCars.length} sales</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-semibold text-gray-900">{formatCurrency(totalRevenue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Sale Price</span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(soldCars.length > 0 ? totalRevenue / soldCars.length : 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-semibold text-gray-900">{successRate}%</span>
              </div>
              <button 
                onClick={() => setActiveModal('sales')}
                className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium"
              >
                View Detailed Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddListingModal 
        isOpen={showAddListing}
        onClose={() => setShowAddListing(false)}
      />
      
      <ListingManagementModal 
        isOpen={activeModal === 'listings'} 
        onClose={closeModal} 
      />
      
      <SalesHistoryModal 
        isOpen={activeModal === 'sales'} 
        onClose={closeModal} 
      />
      
      <SellerAccountSettingsModal 
        isOpen={activeModal === 'settings'} 
        onClose={closeModal} 
      />
      
      <SellerNotificationsModal 
        isOpen={activeModal === 'notifications'} 
        onClose={closeModal} 
      />

      <PostAuctionControlsModal
        isOpen={activeModal === 'postAuction'}
        onClose={closeModal}
        auction={selectedAuction}
      />
    </div>
  );
}