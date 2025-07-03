import React, { useState } from 'react';
import { X, Download, Calendar, DollarSign, TrendingUp, BarChart3, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { useAuction } from '../../contexts/AuctionContext.jsx';

export function SalesHistoryModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { cars } = useAuction();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  if (!isOpen) return null;

  const sellerCars = cars.filter(car => car.sellerId === user?.id);
  const soldCars = sellerCars.filter(car => car.status === 'sold');
  const unsoldCars = sellerCars.filter(car => car.status === 'ended' && car.bids?.length === 0);
  const relistedCars = sellerCars.filter(car => car.relisted);

  // Mock additional sales data
  const salesHistory = soldCars.map(car => ({
    ...car,
    saleDate: new Date(car.auctionEndTime),
    commission: Math.floor(car.currentBid * 0.1), // 10% commission
    netAmount: Math.floor(car.currentBid * 0.9),
    buyerName: car.bids?.[car.bids.length - 1]?.bidderName || 'Anonymous Buyer',
    paymentStatus: 'completed',
    deliveryStatus: 'delivered'
  }));

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'This Year' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'month', label: 'This Month' }
  ];

  const years = ['2024', '2023', '2022', '2021'];

  const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.netAmount, 0);
  const totalCommission = salesHistory.reduce((sum, sale) => sum + sale.commission, 0);
  const averageSalePrice = salesHistory.length > 0 ? totalRevenue / salesHistory.length : 0;
  const successRate = sellerCars.length > 0 ? (soldCars.length / sellerCars.length) * 100 : 0;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const exportToExcel = () => {
    console.log('Exporting sales data to Excel...');
    // Implementation for Excel export
  };

  const exportToPDF = () => {
    console.log('Exporting sales data to PDF...');
    // Implementation for PDF export
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Sales History & Analytics</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Total Revenue</span>
              </div>
              <p className="text-2xl font-bold text-emerald-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-emerald-700 mt-1">Net after commission</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Vehicles Sold</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{soldCars.length}</p>
              <p className="text-sm text-blue-700 mt-1">Success rate: {successRate.toFixed(1)}%</p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Average Sale</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(averageSalePrice)}</p>
              <p className="text-sm text-purple-700 mt-1">Per vehicle</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Unsold Vehicles</span>
              </div>
              <p className="text-2xl font-bold text-orange-900">{unsoldCars.length}</p>
              <p className="text-sm text-orange-700 mt-1">Available for relist</p>
            </div>
          </div>

          {/* Filters and Export */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
              
              {selectedPeriod === 'year' && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={exportToExcel}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                <Download className="w-4 h-4" />
                <span>Export Excel</span>
              </button>
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Sales Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sale Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sale Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Buyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesHistory.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={sale.images[0]}
                            alt={sale.title}
                            className="w-12 h-12 rounded-lg object-cover mr-3"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.title}</div>
                            <div className="text-sm text-gray-500">{sale.year} • {sale.mileage.toLocaleString()} miles</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(sale.currentBid)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatCurrency(sale.commission)}</div>
                        <div className="text-xs text-gray-500">10%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(sale.netAmount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.saleDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale.buyerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sale.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            Payment: {sale.paymentStatus}
                          </span>
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sale.deliveryStatus === 'delivered' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            Delivery: {sale.deliveryStatus}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {salesHistory.length === 0 && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sales history</h3>
              <p className="text-gray-600">Your sold vehicles will appear here once you complete sales.</p>
            </div>
          )}

          {/* Performance Insights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Best performing category:</span>
                  <span className="font-medium">Sports Cars</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average days to sell:</span>
                  <span className="font-medium">4.2 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Highest sale:</span>
                  <span className="font-medium">{formatCurrency(Math.max(...salesHistory.map(s => s.currentBid)))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total commission paid:</span>
                  <span className="font-medium">{formatCurrency(totalCommission)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-800">Consider relisting {unsoldCars.length} unsold vehicles with adjusted reserve prices.</p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800">Your sports cars sell 23% faster than average. Focus on this category.</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-yellow-800">Vehicles with professional photos sell for 15% more on average.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}