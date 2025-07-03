import React from 'react';
import { BarChart3, Users, Car, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      label: 'Total Users',
      value: '12,574',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Active Auctions',
      value: '342',
      change: '+8%',
      icon: Car,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Revenue',
      value: '$2.4M',
      change: '+23%',
      icon: DollarSign,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Success Rate',
      value: '94.2%',
      change: '+2%',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Smith', time: '2 minutes ago', type: 'user' },
    { id: 2, action: 'Auction completed', item: '2022 BMW M4', time: '15 minutes ago', type: 'auction' },
    { id: 3, action: 'Payment processed', amount: '$85,000', time: '1 hour ago', type: 'payment' },
    { id: 4, action: 'New listing created', seller: 'Premium Motors', time: '2 hours ago', type: 'listing' },
    { id: 5, action: 'User verification pending', user: 'Sarah Johnson', time: '3 hours ago', type: 'verification' }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {user?.name}
        </h1>
        <p className="text-gray-600">Here's what's happening with your platform today.</p>
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
        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Manage Users</span>
            </button>
            <button className="p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
              <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Review Listings</span>
            </button>
            <button className="p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">View Analytics</span>
            </button>
            <button className="p-4 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
              <AlertTriangle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-900">Handle Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}