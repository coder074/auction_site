import React, { useState } from 'react';
import { X, Search, Filter, Calendar, User, Activity, AlertTriangle, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function ActivityLogsModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  if (!isOpen) return null;

  // Mock activity logs
  const activityLogs = [
    {
      id: 'log_001',
      timestamp: '2024-03-15 14:30:25',
      type: 'bid_placed',
      user: 'John Smith (ID: 123)',
      action: 'Placed bid of $72,500 on 2022 BMW M4 Competition',
      details: {
        auctionId: 'auction_456',
        bidAmount: 72500,
        previousBid: 70000
      },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'log_002',
      timestamp: '2024-03-15 14:25:12',
      type: 'admin_action',
      user: 'Admin User (ID: 1)',
      action: 'Approved dealer application for Premium Motors LLC',
      details: {
        dealerId: 'dealer_789',
        applicationId: 'app_012'
      },
      ipAddress: '10.0.0.1',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 'log_003',
      timestamp: '2024-03-15 14:20:45',
      type: 'auction_ended',
      user: 'System',
      action: 'Auction ended for 2021 Porsche 911 Turbo S - Winner: Sarah Johnson',
      details: {
        auctionId: 'auction_789',
        winnerId: 'user_456',
        finalBid: 195000
      },
      ipAddress: 'system',
      userAgent: 'system'
    },
    {
      id: 'log_004',
      timestamp: '2024-03-15 14:15:33',
      type: 'user_login',
      user: 'Mike Wilson (ID: 789)',
      action: 'User logged in successfully',
      details: {
        loginMethod: 'email_password',
        sessionId: 'sess_abc123'
      },
      ipAddress: '203.0.113.45',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
    },
    {
      id: 'log_005',
      timestamp: '2024-03-15 14:10:18',
      type: 'listing_created',
      user: 'Elite Cars (ID: 234)',
      action: 'Created new listing: 2023 Ferrari F8 Tributo',
      details: {
        listingId: 'listing_567',
        startingBid: 275000,
        status: 'pending_review'
      },
      ipAddress: '198.51.100.25',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 'log_006',
      timestamp: '2024-03-15 14:05:42',
      type: 'payment_processed',
      user: 'Payment System',
      action: 'Payment of $85,000 processed for auction_456',
      details: {
        paymentId: 'pay_xyz789',
        amount: 85000,
        method: 'bank_transfer',
        status: 'completed'
      },
      ipAddress: 'system',
      userAgent: 'payment_processor'
    },
    {
      id: 'log_007',
      timestamp: '2024-03-15 14:00:15',
      type: 'security_alert',
      user: 'Security System',
      action: 'Multiple failed login attempts detected for user: suspicious@email.com',
      details: {
        attempts: 5,
        ipAddress: '192.0.2.100',
        blocked: true
      },
      ipAddress: '192.0.2.100',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    }
  ];

  const logTypes = [
    { value: 'all', label: 'All Activities' },
    { value: 'bid_placed', label: 'Bids' },
    { value: 'admin_action', label: 'Admin Actions' },
    { value: 'auction_ended', label: 'Auction Events' },
    { value: 'user_login', label: 'User Logins' },
    { value: 'listing_created', label: 'Listings' },
    { value: 'payment_processed', label: 'Payments' },
    { value: 'security_alert', label: 'Security Alerts' }
  ];

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesType;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case 'bid_placed': return '💰';
      case 'admin_action': return '⚙️';
      case 'auction_ended': return '🏁';
      case 'user_login': return '🔐';
      case 'listing_created': return '📝';
      case 'payment_processed': return '💳';
      case 'security_alert': return '🚨';
      default: return '📋';
    }
  };

  const getLogColor = (type) => {
    switch (type) {
      case 'bid_placed': return 'text-green-600';
      case 'admin_action': return 'text-blue-600';
      case 'auction_ended': return 'text-purple-600';
      case 'user_login': return 'text-indigo-600';
      case 'listing_created': return 'text-orange-600';
      case 'payment_processed': return 'text-emerald-600';
      case 'security_alert': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Activity Logs & Tracking</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {logTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Activities</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">{filteredLogs.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Active Users</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">156</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Security Alerts</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-1">3</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Today's Events</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">47</p>
            </div>
          </div>

          {/* Activity Log List */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getLogIcon(log.type)}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-sm font-medium ${getLogColor(log.type)}`}>
                          {log.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      
                      <p className="text-gray-900 mb-1">{log.action}</p>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">User:</span> {log.user}
                        {log.ipAddress !== 'system' && (
                          <>
                            <span className="ml-4 font-medium">IP:</span> {log.ipAddress}
                          </>
                        )}
                      </div>

                      {log.details && (
                        <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                          <span className="font-medium">Details:</span> {JSON.stringify(log.details, null, 2)}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                        <Activity className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}