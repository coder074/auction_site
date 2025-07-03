import React from 'react';
import { Plus, Car, TrendingUp, Clock, DollarSign, Eye } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function SellerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      label: 'Active Listings',
      value: '8',
      change: '+2',
      icon: Car,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: 'Total Sales',
      value: '$485K',
      change: '+15%',
      icon: DollarSign,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: 'Success Rate',
      value: '92%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      label: 'Avg. Sale Time',
      value: '4.2 days',
      change: '-0.5d',
      icon: Clock,
      color: 'bg-emerald-100 text-emerald-600'
    }
  ];

  const myListings = [
    {
      id: 1,
      title: '2022 BMW M4 Competition',
      currentBid: '$72,500',
      timeLeft: '2d 14h',
      bids: 12,
      status: 'active',
      image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: '2021 Audi RS6 Avant',
      currentBid: '$95,000',
      timeLeft: '5d 8h',
      bids: 8,
      status: 'active',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: '2020 Mercedes C63 AMG',
      finalPrice: '$68,900',
      soldDate: '2 days ago',
      bids: 15,
      status: 'sold',
      image: 'https://images.pexels.com/photos/3864627/pexels-photo-3864627.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-gray-600">Manage your car listings and track your sales performance.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add New Listing</span>
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
          <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {myListings.map((listing) => (
              <div key={listing.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{listing.bids} bids</span>
                    {listing.status === 'active' ? (
                      <>
                        <span>Current: {listing.currentBid}</span>
                        <span>Time left: {listing.timeLeft}</span>
                      </>
                    ) : (
                      <>
                        <span>Sold for: {listing.finalPrice}</span>
                        <span>{listing.soldDate}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {listing.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}