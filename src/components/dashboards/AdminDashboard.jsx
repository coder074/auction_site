import React, { useState } from 'react';
import { 
  BarChart3, Users, Car, DollarSign, TrendingUp, AlertTriangle, Shield, Settings,
  Eye, Edit, Trash2, Check, X, UserCheck, UserX, Download, Search, Filter,
  Clock, Activity, FileText, CreditCard, Ban, UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';
import { UserManagementModal } from '../admin/UserManagementModal.jsx';
import { AuctionMonitorModal } from '../admin/AuctionMonitorModal.jsx';
import { ContentModerationModal } from '../admin/ContentModerationModal.jsx';
import { FinancialOverviewModal } from '../admin/FinancialOverviewModal.jsx';
import { ActivityLogsModal } from '../admin/ActivityLogsModal.jsx';

export function AdminDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { cars, notifications } = useAuction();
  const [activeModal, setActiveModal] = useState(null);

  // Mock data for admin functionality
  const totalUsers = 12574;
  const pendingApplications = 23;
  const activeAuctions = cars.filter(car => car.status === 'active').length;
  const totalRevenue = 2400000;
  const successRate = 94.2;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      onClick: () => setActiveModal('users')
    },
    {
      label: 'Active Auctions',
      value: activeAuctions.toString(),
      change: '+8%',
      icon: Car,
      color: 'bg-blue-100 text-blue-600',
      onClick: () => setActiveModal('auctions')
    },
    {
      label: 'Total Revenue',
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      change: '+23%',
      icon: DollarSign,
      color: 'bg-blue-100 text-blue-600',
      onClick: () => setActiveModal('financial')
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      change: '+2%',
      icon: TrendingUp,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: 'New dealer application', 
      user: 'Premium Motors LLC', 
      time: '2 minutes ago', 
      type: 'application',
      status: 'pending'
    },
    { 
      id: 2, 
      action: 'Auction completed', 
      item: '2022 BMW M4', 
      time: '15 minutes ago', 
      type: 'auction',
      amount: '$85,000'
    },
    { 
      id: 3, 
      action: 'Payment processed', 
      amount: '$85,000', 
      time: '1 hour ago', 
      type: 'payment',
      status: 'completed'
    },
    { 
      id: 4, 
      action: 'New listing created', 
      seller: 'Elite Cars', 
      time: '2 hours ago', 
      type: 'listing',
      status: 'pending_review'
    },
    { 
      id: 5, 
      action: 'User verification pending', 
      user: 'Sarah Johnson', 
      time: '3 hours ago', 
      type: 'verification',
      status: 'pending'
    }
  ];

  const quickActions = [
    { 
      icon: Users, 
      label: 'User Management', 
      color: 'text-blue-600',
      description: 'Manage users, approve dealers',
      onClick: () => setActiveModal('users')
    },
    { 
      icon: Car, 
      label: 'Auction Monitor', 
      color: 'text-blue-600',
      description: 'Live auction dashboard',
      onClick: () => setActiveModal('auctions')
    },
    { 
      icon: Shield, 
      label: 'Content Moderation', 
      color: 'text-blue-600',
      description: 'Review listings & content',
      onClick: () => setActiveModal('content')
    },
    { 
      icon: DollarSign, 
      label: 'Financial Overview', 
      color: 'text-blue-600',
      description: 'Track sales & payments',
      onClick: () => setActiveModal('financial')
    },
    { 
      icon: Activity, 
      label: 'Activity Logs', 
      color: 'text-blue-600',
      description: 'View system logs',
      onClick: () => setActiveModal('logs')
    },
    { 
      icon: Settings, 
      label: 'System Settings', 
      color: 'text-blue-600',
      description: 'Platform configuration',
      onClick: () => setActiveModal('settings')
    }
  ];

  const pendingItems = [
    {
      type: 'application',
      title: 'Dealer Application',
      description: 'Premium Motors LLC - Luxury car dealer',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      type: 'listing',
      title: 'Listing Review',
      description: '2023 Ferrari F8 Tributo - Needs verification',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      type: 'dispute',
      title: 'Payment Dispute',
      description: 'Buyer claims vehicle condition mismatch',
      time: '1 day ago',
      priority: 'high'
    }
  ];

  const closeModal = () => setActiveModal(null);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('dashboard.welcome')}, {user?.name}
        </h1>
        <p className="text-gray-600">Manage your auction platform and monitor all activities.</p>
      </div>

      {/* Alert Banner for Pending Items */}
      {pendingApplications > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                {pendingApplications} items require your attention
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Dealer applications, listing reviews, and user verifications are pending.
              </p>
            </div>
            <button 
              onClick={() => setActiveModal('users')}
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
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            <button 
              onClick={() => setActiveModal('logs')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All Logs
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'application' ? 'bg-yellow-500' :
                  activity.type === 'auction' ? 'bg-green-500' :
                  activity.type === 'payment' ? 'bg-blue-500' :
                  activity.type === 'listing' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>{activity.time}</span>
                    {activity.amount && <span>• {activity.amount}</span>}
                    {activity.status && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Pending Items */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('dashboard.quick.actions')}</h2>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <button 
                  key={index}
                  onClick={action.onClick}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-6 h-6 ${action.color} group-hover:text-blue-700`} />
                    <div>
                      <span className="text-sm font-medium text-gray-900 block">{action.label}</span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Pending Items */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Items</h2>
            <div className="space-y-3">
              {pendingItems.map((item, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.priority === 'high' ? 'bg-red-100 text-red-800' :
                          item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <button className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Check className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserManagementModal 
        isOpen={activeModal === 'users'} 
        onClose={closeModal} 
      />
      <AuctionMonitorModal 
        isOpen={activeModal === 'auctions'} 
        onClose={closeModal} 
      />
      <ContentModerationModal 
        isOpen={activeModal === 'content'} 
        onClose={closeModal} 
      />
      <FinancialOverviewModal 
        isOpen={activeModal === 'financial'} 
        onClose={closeModal} 
      />
      <ActivityLogsModal 
        isOpen={activeModal === 'logs'} 
        onClose={closeModal} 
      />
    </div>
  );
}