import React from 'react';
import { Heart, Clock, TrendingUp, Award, Eye, Gavel } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function BuyerDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      label: 'Active Bids',
      value: '5',
      change: '+2',
      icon: Gavel,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      label: 'Watching',
      value: '12',
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

  const activeBids = [
    {
      id: 1,
      title: '2021 Porsche 911 Turbo S',
      myBid: '$195,000',
      currentBid: '$198,000',
      timeLeft: '1d 8h',
      isWinning: false,
      image: 'https://images.pexels.com/photos/3566158/pexels-photo-3566158.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: '2022 McLaren 720S',
      myBid: '$285,000',
      currentBid: '$285,000',
      timeLeft: '3d 12h',
      isWinning: true,
      image: 'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      title: '2020 Ferrari F8 Tributo',
      myBid: '$245,000',
      currentBid: '$250,000',
      timeLeft: '2d 4h',
      isWinning: false,
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const watchlist = [
    {
      id: 1,
      title: '2023 Lamborghini Huracán',
      currentBid: '$185,000',
      timeLeft: '4d 16h',
      image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      title: '2021 Aston Martin DB11',
      currentBid: '$165,000',
      timeLeft: '6d 2h',
      image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

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
              {activeBids.map((bid) => (
                <div key={bid.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img
                    src={bid.image}
                    alt={bid.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{bid.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>My bid: {bid.myBid}</span>
                      <span>Current: {bid.currentBid}</span>
                      <span>Time: {bid.timeLeft}</span>
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
              {watchlist.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>Current: {item.currentBid}</span>
                      <span>Time: {item.timeLeft}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors">
                      Bid Now
                    </button>
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