import React, { useState } from 'react';
import { X, TrendingUp, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';

export function BidModal({ car, isOpen, onClose }) {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { placeBid } = useAuction();
  const { getRoleBg } = useTheme();

  if (!isOpen || !car) return null;

  const minimumBid = car.currentBid + 1000; // $1000 increment
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const amount = parseInt(bidAmount.replace(/[^0-9]/g, ''));
    
    if (amount < minimumBid) {
      setError(`Minimum bid is ${formatCurrency(minimumBid)}`);
      setIsSubmitting(false);
      return;
    }

    const success = placeBid(car.id, amount, user.id, user.name);
    
    if (success) {
      onClose();
      setBidAmount('');
    } else {
      setError('Failed to place bid. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const handleBidAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBidAmount(value ? formatCurrency(parseInt(value)) : '');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{t('bid.place')}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <img
              src={car.images[0]}
              alt={car.title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-gray-900">{car.title}</h3>
            <p className="text-sm text-gray-600">{car.location}</p>
          </div>

          <div className="mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('bid.current')}:</span>
              <span className="font-semibold">{formatCurrency(car.currentBid)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('bid.minimum')}:</span>
              <span className="font-semibold">{formatCurrency(minimumBid)}</span>
            </div>
            {car.reservePrice && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t('bid.reserve')}:</span>
                <span className="font-semibold">{formatCurrency(car.reservePrice)}</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('bid.amount')}
              </label>
              <input
                type="text"
                value={bidAmount}
                onChange={handleBidAmountChange}
                placeholder={formatCurrency(minimumBid)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm text-red-600">{error}</span>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${getRoleBg()} hover:opacity-90 disabled:opacity-50`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>{isSubmitting ? t('common.loading') : t('bid.confirm')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}