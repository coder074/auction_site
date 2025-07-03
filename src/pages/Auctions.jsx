import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X, Grid, List } from 'lucide-react';
import { CarCard } from '../components/CarCard.jsx';
import { CarDetailModal } from '../components/CarDetailModal.jsx';
import { BidModal } from '../components/BidModal.jsx';
import { AuctionTableView } from '../components/AuctionTableView.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Auctions() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetail, setShowCarDetail] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [sortBy, setSortBy] = useState('ending');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    cars, 
    searchTerm, 
    setSearchTerm, 
    filters, 
    setFilters, 
    getFilteredCars 
  } = useAuction();

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowCarDetail(true);
  };

  const handlePlaceBid = (car) => {
    if (!user) {
      // Redirect to login if not authenticated
      return;
    }
    setSelectedCar(car);
    setShowBidModal(true);
  };

  const filteredCars = getFilteredCars();
  
  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'ending':
        return new Date(a.auctionEndTime) - new Date(b.auctionEndTime);
      case 'price-low':
        return a.currentBid - b.currentBid;
      case 'price-high':
        return b.currentBid - a.currentBid;
      case 'newest':
        return new Date(b.auctionStartTime) - new Date(a.auctionStartTime);
      case 'bids':
        return (b.bids?.length || 0) - (a.bids?.length || 0);
      default:
        return 0;
    }
  });

  const brands = Array.from(new Set(cars.map(car => car.brand))).sort();
  const conditions = ['excellent', 'good', 'fair', 'poor'];
  const statuses = ['active', 'ending-soon', 'upcoming'];
  const fuelTypes = ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
  const transmissions = ['Manual', 'Automatic', 'CVT'];

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      priceRange: '',
      year: '',
      condition: '',
      location: '',
      status: '',
      fuelType: '',
      transmission: ''
    });
    setSearchTerm('');
  };

  // Get ending soon count for badge
  const endingSoonCount = sortedCars.filter(car => {
    const timeLeft = new Date(car.auctionEndTime) - new Date();
    return timeLeft <= 24 * 60 * 60 * 1000 && timeLeft > 0; // 24 hours
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('auctions.title')}
          </h1>
          <p className="text-gray-600">
            {t('auctions.subtitle')}
          </p>
          {user && user.role === 'buyer' && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800">
                <strong>Dealer Access:</strong> You have full access to bid on all vehicles. 
                All bids are binding and final.
              </p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('auctions.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded ${viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="ending">{t('auctions.sort.ending')}</option>
                <option value="price-low">{t('auctions.sort.price.low')}</option>
                <option value="price-high">{t('auctions.sort.price.high')}</option>
                <option value="newest">{t('auctions.sort.newest')}</option>
                <option value="bids">Most Bids</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>{t('auctions.filters')}</span>
                {Object.values(filters).some(filter => filter !== '') && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auctions.filter.brand')}
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => updateFilter('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all')}</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auctions.filter.price')}
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => updateFilter('priceRange', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all')}</option>
                    <option value="under100k">Under $100K</option>
                    <option value="100k-200k">$100K - $200K</option>
                    <option value="200k-300k">$200K - $300K</option>
                    <option value="over300k">Over $300K</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auctions.filter.year')}
                  </label>
                  <select
                    value={filters.year}
                    onChange={(e) => updateFilter('year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all')}</option>
                    <option value="2024+">2024+</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2018-2019">2018-2019</option>
                    <option value="pre2018">Before 2018</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auctions.filter.condition')}
                  </label>
                  <select
                    value={filters.condition}
                    onChange={(e) => updateFilter('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all')}</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>
                        {condition.charAt(0).toUpperCase() + condition.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type
                  </label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => updateFilter('fuelType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">{t('common.all')}</option>
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('auctions.clear.filters')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              Showing {sortedCars.length} of {cars.length} auctions
            </p>
            {endingSoonCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                {endingSoonCount} ending soon
              </span>
            )}
          </div>
          {user && user.role === 'buyer' && (
            <div className="text-sm text-gray-600">
              Logged in as: <span className="font-medium text-orange-600">{user.name}</span>
            </div>
          )}
        </div>

        {/* Auction Display */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={handleViewDetails}
                onPlaceBid={handlePlaceBid}
              />
            ))}
          </div>
        ) : (
          <AuctionTableView
            cars={sortedCars}
            onViewDetails={handleViewDetails}
            onPlaceBid={handlePlaceBid}
          />
        )}

        {sortedCars.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('auctions.no.results')}</h3>
            <p className="text-gray-600">{t('auctions.no.results.desc')}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <CarDetailModal
        car={selectedCar}
        isOpen={showCarDetail}
        onClose={() => setShowCarDetail(false)}
        onPlaceBid={handlePlaceBid}
      />

      <BidModal
        car={selectedCar}
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
    </div>
  );
}