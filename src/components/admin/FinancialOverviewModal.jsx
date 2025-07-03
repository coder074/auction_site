import React, { useState } from 'react';
import { X, DollarSign, TrendingUp, Download, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function FinancialOverviewModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  // Mock financial data
  const financialStats = {
    totalRevenue: 2400000,
    monthlyRevenue: 185000,
    pendingPayments: 45000,
    completedSales: 156,
    averageCommission: 8.5,
    totalCommissions: 204000
  };

  const recentTransactions = [
    {
      id: 'txn_001',
      type: 'sale_commission',
      amount: 8500,
      description: '2022 BMW M4 Competition - Commission (10%)',
      date: '2024-03-15',
      status: 'completed',
      buyer: 'John Smith',
      seller: 'Premium Motors'
    },
    {
      id: 'txn_002',
      type: 'buyer_payment',
      amount: 85000,
      description: '2022 BMW M4 Competition - Final Payment',
      date: '2024-03-15',
      status: 'pending',
      buyer: 'John Smith',
      seller: 'Premium Motors'
    },
    {
      id: 'txn_003',
      type: 'seller_payout',
      amount: 76500,
      description: '2022 BMW M4 Competition - Seller Payout',
      date: '2024-03-14',
      status: 'processing',
      buyer: 'John Smith',
      seller: 'Premium Motors'
    }
  ];

  const pendingPayments = [
    {
      id: 'pending_001',
      auctionId: 'auction_123',
      vehicle: '2021 Porsche 911 Turbo S',
      buyer: 'Sarah Johnson',
      seller: 'Elite Cars',
      amount: 195000,
      dueDate: '2024-03-18',
      daysOverdue: 0,
      status: 'due_soon'
    },
    {
      id: 'pending_002',
      auctionId: 'auction_124',
      vehicle: '2020 Ferrari F8 Tributo',
      buyer: 'Mike Wilson',
      seller: 'Luxury Motors',
      amount: 290000,
      dueDate: '2024-03-12',
      daysOverdue: 3,
      status: 'overdue'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Financial Overview' },
    { id: 'transactions', label: 'Recent Transactions' },
    { id: 'pending', label: 'Pending Payments' },
    { id: 'reports', label: 'Reports & Export' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
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
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Financial Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-900">Total Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(financialStats.totalRevenue)}</p>
                    <p className="text-sm text-green-700 mt-1">+23% from last month</p>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Monthly Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(financialStats.monthlyRevenue)}</p>
                    <p className="text-sm text-blue-700 mt-1">March 2024</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-900">Pending Payments</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-900">{formatCurrency(financialStats.pendingPayments)}</p>
                    <p className="text-sm text-yellow-700 mt-1">2 overdue payments</p>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed Sales:</span>
                        <span className="font-semibold">{financialStats.completedSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Commission:</span>
                        <span className="font-semibold">{financialStats.averageCommission}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Commissions:</span>
                        <span className="font-semibold">{formatCurrency(financialStats.totalCommissions)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="text-green-600 font-semibold">142 payments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing:</span>
                        <span className="text-blue-600 font-semibold">8 payments</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overdue:</span>
                        <span className="text-red-600 font-semibold">2 payments</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm">
                        Generate Monthly Report
                      </button>
                      <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm">
                        Export Transaction Data
                      </button>
                      <button className="w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded text-sm">
                        Send Payment Reminders
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Parties
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.description}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {transaction.id}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {transaction.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                transaction.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div>Buyer: {transaction.buyer}</div>
                              <div>Seller: {transaction.seller}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pending' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Pending Payments</h3>
                
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{payment.vehicle}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                            payment.status === 'due_soon' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {payment.status === 'overdue' ? `${payment.daysOverdue} days overdue` : 'Due soon'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Amount:</span> {formatCurrency(payment.amount)}
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span> {payment.dueDate}
                          </div>
                          <div>
                            <span className="font-medium">Buyer:</span> {payment.buyer}
                          </div>
                          <div>
                            <span className="font-medium">Seller:</span> {payment.seller}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Send Reminder
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          View Details
                        </button>
                        {payment.status === 'overdue' && (
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                            Escalate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Reports & Export</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Reports</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>Monthly Revenue Report</span>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>Commission Summary</span>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>Payment Status Report</span>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Export</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>All Transactions (CSV)</span>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>Seller Payouts (Excel)</span>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <span>Tax Summary (PDF)</span>
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}