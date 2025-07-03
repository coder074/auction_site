import React, { useState } from 'react';
import { 
  X, Search, Filter, UserCheck, UserX, Eye, Edit, Trash2, 
  Shield, Ban, UserPlus, Mail, Phone, Calendar, MapPin
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function UserManagementModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  if (!isOpen) return null;

  // Mock user data
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0123',
      role: 'buyer',
      status: 'active',
      verified: true,
      joinDate: '2024-01-15',
      location: 'New York, NY',
      totalBids: 45,
      totalSpent: 125000,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '2',
      name: 'Premium Motors LLC',
      email: 'contact@premiummotors.com',
      phone: '+1-555-0456',
      role: 'seller',
      status: 'pending',
      verified: false,
      joinDate: '2024-03-10',
      location: 'Los Angeles, CA',
      totalListings: 0,
      totalSales: 0,
      businessLicense: 'PMT-2024-001',
      avatar: null
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0789',
      role: 'buyer',
      status: 'active',
      verified: true,
      joinDate: '2024-02-20',
      location: 'Chicago, IL',
      totalBids: 23,
      totalSpent: 85000,
      avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      id: '4',
      name: 'Elite Cars Inc',
      email: 'info@elitecars.com',
      phone: '+1-555-0321',
      role: 'seller',
      status: 'active',
      verified: true,
      joinDate: '2023-11-05',
      location: 'Miami, FL',
      totalListings: 12,
      totalSales: 485000,
      businessLicense: 'ECI-2023-045',
      avatar: null
    },
    {
      id: '5',
      name: 'Mike Wilson',
      email: 'mike.w@email.com',
      phone: '+1-555-0654',
      role: 'buyer',
      status: 'suspended',
      verified: true,
      joinDate: '2024-01-30',
      location: 'Seattle, WA',
      totalBids: 8,
      totalSpent: 0,
      suspensionReason: 'Payment disputes',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'pending' && user.status === 'pending') ||
                      (activeTab === 'buyers' && user.role === 'buyer') ||
                      (activeTab === 'sellers' && user.role === 'seller') ||
                      (activeTab === 'suspended' && user.status === 'suspended');
    return matchesSearch && matchesTab;
  });

  const tabs = [
    { id: 'all', label: 'All Users', count: users.length },
    { id: 'pending', label: 'Pending Approval', count: users.filter(u => u.status === 'pending').length },
    { id: 'buyers', label: 'Buyers', count: users.filter(u => u.role === 'buyer').length },
    { id: 'sellers', label: 'Sellers', count: users.filter(u => u.role === 'seller').length },
    { id: 'suspended', label: 'Suspended', count: users.filter(u => u.status === 'suspended').length }
  ];

  const handleApproveUser = (userId) => {
    console.log('Approving user:', userId);
    // Implementation for approving user
  };

  const handleRejectUser = (userId) => {
    console.log('Rejecting user:', userId);
    // Implementation for rejecting user
  };

  const handleSuspendUser = (userId) => {
    console.log('Suspending user:', userId);
    // Implementation for suspending user
  };

  const handleImpersonateUser = (userId) => {
    console.log('Impersonating user:', userId);
    // Implementation for user impersonation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
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
                      ? 'bg-blue-100 text-blue-700'
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

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Add New User</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-gray-600 font-medium text-lg">
                            {user.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{user.name}</h3>
                          {user.verified && (
                            <UserCheck className="w-4 h-4 text-green-600" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === 'buyer' ? 'bg-orange-100 text-orange-800' :
                            user.role === 'seller' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-4 h-4" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{user.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>Joined {user.joinDate}</span>
                          </div>
                        </div>

                        {user.role === 'buyer' && (
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Bids: {user.totalBids}</span>
                            <span>Spent: ${user.totalSpent?.toLocaleString()}</span>
                          </div>
                        )}

                        {user.role === 'seller' && (
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <span>Listings: {user.totalListings}</span>
                            <span>Sales: ${user.totalSales?.toLocaleString()}</span>
                            {user.businessLicense && <span>License: {user.businessLicense}</span>}
                          </div>
                        )}

                        {user.suspensionReason && (
                          <div className="mt-2 text-sm text-red-600">
                            Suspended: {user.suspensionReason}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {user.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleApproveUser(user.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleRejectUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        {user.status === 'active' && (
                          <>
                            <button 
                              onClick={() => handleImpersonateUser(user.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleSuspendUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}