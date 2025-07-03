import React, { useState } from 'react';
import { X, Award, Download, Eye, Star, Calendar, DollarSign } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function PurchaseHistoryModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getUserBids } = useAuction();
  const [selectedYear, setSelectedYear] = useState('all');

  if (!isOpen) return null;

  const userBids = user ? getUserBids(user.id) : [];
  const wonAuctions = userBids.filter(bid => bid.car.status === 'ended' && bid.isWinning);

  // Mock additional purchase data
  const purchaseHistory = wonAuctions.map(bid => ({
    ...bid,
    purchaseDate: bid.timestamp,
    deliveryDate: new Date(new Date(bid.timestamp).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    paymentStatus: 'completed',
    deliveryStatus: 'delivered',
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    invoiceNumber: `INV-${bid.id.slice(-6).toUpperCase()}`,
    totalPaid: bid.amount + Math.floor(bid.amount * 0.1), // Including fees
    fees: Math.floor(bid.amount * 0.1)
  }));

  const years = ['all', ...new Set(purchaseHistory.map(p => new Date(p.purchaseDate).getFullYear()))];
  
  const filteredPurchases = selectedYear === 'all' 
    ? purchaseHistory 
    : purchaseHistory.filter(p => new Date(p.purchaseDate).getFullYear() === parseInt(selectedYear));

  const totalSpent = filteredPurchases.reduce((sum, purchase) => sum + purchase.totalPaid, 0);
  const averagePrice = filteredPurchases.length > 0 ? totalSpent / filteredPurchases.length : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Purchases</span>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-1">{filteredPurchases.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Total Spent</span>
              </div>
              <p className="text-2xl font-bold text-green-900 mt-1">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Average Price</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 mt-1">{formatCurrency(averagePrice)}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Avg. Rating</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900 mt-1">
                {filteredPurchases.length > 0 
                  ? (filteredPurchases.reduce((sum, p) => sum + p.rating, 0) / filteredPurchases.length).toFixed(1)
                  : '0.0'}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Download className="w-4 h-4" />
              <span>Export History</span>
            </button>
          </div>

          {/* Purchase List */}
          <div className="space-y-6">
            {filteredPurchases.map((purchase) => (
              <div key={purchase.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  <img
                    src={purchase.car.images[0]}
                    alt={purchase.car.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{purchase.car.title}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Purchased
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Purchase Price:</span>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(purchase.amount)}</p>
                      </div>
                      <div>
                        <span className="font-medium">Total Paid:</span>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(purchase.totalPaid)}</p>
                      </div>
                      <div>
                        <span className="font-medium">Purchase Date:</span>
                        <p className="text-gray-900">{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Delivery Date:</span>
                        <p className="text-gray-900">{new Date(purchase.deliveryDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Invoice:</span> {purchase.invoiceNumber}
                      </div>
                      <div>
                        <span className="font-medium">Fees:</span> {formatCurrency(purchase.fees)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">Rating:</span>
                        <div className="flex space-x-1">
                          {renderStars(purchase.rating)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Payment: {purchase.paymentStatus}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.deliveryStatus === 'delivered' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        Delivery: {purchase.deliveryStatus}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <button className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:bg-gray-50 rounded text-sm">
                      <Download className="w-4 h-4" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredPurchases.length === 0 && (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases found</h3>
                <p className="text-gray-600">
                  {selectedYear === 'all' 
                    ? 'You haven\'t won any auctions yet' 
                    : `No purchases found for ${selectedYear}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}