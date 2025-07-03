import React, { useState } from 'react';
import { X, MapPin, Calendar, Gauge, Fuel, Settings, Palette, ChevronLeft, ChevronRight, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function CarDetailModal({ car, isOpen, onClose, onPlaceBid }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();
  const { user } = useAuth();
  const { getRoleBg } = useTheme();

  if (!isOpen || !car) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const getTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(car.auctionEndTime);
    const diff = endTime.getTime() - now.getTime();
    
    if (diff <= 0) return t('time.ended');
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const tabs = [
    { id: 'overview', label: t('car.details.overview') },
    { id: 'specifications', label: t('car.details.specifications') },
    { id: 'features', label: t('car.details.features') },
    { id: 'inspection', label: t('car.details.inspection') },
    { id: 'history', label: t('car.details.history') }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{car.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image Gallery */}
          <div className="relative mb-6">
            <img
              src={car.images[currentImageIndex]}
              alt={car.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            {car.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Auction Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">{t('bid.current')}</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(car.currentBid)}</p>
              <p className="text-sm text-gray-600">{car.bids.length} bids</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Time Left</h3>
              <p className="text-xl font-bold text-gray-900">{getTimeLeft()}</p>
              <p className="text-sm text-gray-600">
                Ends {new Date(car.auctionEndTime).toLocaleDateString()}
              </p>
            </div>
            {car.reservePrice && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{t('bid.reserve')}</h3>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(car.reservePrice)}</p>
                <p className={`text-sm ${
                  car.currentBid >= car.reservePrice ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {car.currentBid >= car.reservePrice ? t('bid.reserve.met') : t('bid.reserve.not.met')}
                </p>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-700">{car.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{car.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{car.year}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{car.mileage.toLocaleString()} miles</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Condition: {car.condition}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-medium">{car.vin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engine:</span>
                    <span className="font-medium">{car.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Drivetrain:</span>
                    <span className="font-medium">{car.drivetrain}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fuel Type:</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exterior Color:</span>
                    <span className="font-medium">{car.exteriorColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interior Color:</span>
                    <span className="font-medium">{car.interiorColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{car.category}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'inspection' && car.inspectionReport && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overall:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.overall === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.overall}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Engine:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.engine === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.engine}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.transmission === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.transmission}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brakes:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.brakes === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.brakes}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tires:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.tires === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.tires}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interior:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.interior === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.interior}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exterior:</span>
                    <span className={`font-medium ${
                      car.inspectionReport.exterior === 'Excellent' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {car.inspectionReport.exterior}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                {car.bids.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No bids yet</p>
                ) : (
                  car.bids.map((bid, index) => (
                    <div key={bid.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{bid.bidderName}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(bid.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatCurrency(bid.amount)}</p>
                        {index === 0 && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Current High
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {user && user.role === 'buyer' && car.status === 'active' && (
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('common.close')}
              </button>
              <button
                onClick={() => onPlaceBid(car)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${getRoleBg()} hover:opacity-90`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{t('bid.place')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}