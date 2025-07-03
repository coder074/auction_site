import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { Car } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const mockCars: Car[] = [
  {
    id: '1',
    title: '2022 BMW M4 Competition',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2022,
    mileage: 12500,
    condition: 'excellent',
    startingBid: 65000,
    currentBid: 72500,
    images: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Pristine BMW M4 Competition with full service history',
    sellerId: '2',
    sellerName: 'Premium Motors',
    auctionEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Carbon Fiber', 'Track Package', 'Premium Audio'],
    location: 'Los Angeles, CA'
  },
  {
    id: '2',
    title: '2021 Porsche 911 Turbo S',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2021,
    mileage: 8900,
    condition: 'excellent',
    startingBid: 180000,
    currentBid: 195000,
    images: ['https://images.pexels.com/photos/3566158/pexels-photo-3566158.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Stunning Porsche 911 Turbo S in pristine condition',
    sellerId: '2',
    sellerName: 'Luxury Autos',
    auctionEndTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Sport Package', 'Premium Interior', 'Carbon Ceramic Brakes'],
    location: 'Miami, FL'
  },
  {
    id: '3',
    title: '2020 Mercedes-AMG GT R',
    brand: 'Mercedes',
    model: 'AMG GT R',
    year: 2020,
    mileage: 15000,
    condition: 'excellent',
    startingBid: 140000,
    currentBid: 152000,
    images: ['https://images.pexels.com/photos/3864627/pexels-photo-3864627.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Exceptional Mercedes-AMG GT R with track performance',
    sellerId: '2',
    sellerName: 'Elite Cars',
    auctionEndTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Track Pack', 'Carbon Fiber', 'Racing Seats'],
    location: 'New York, NY'
  },
  {
    id: '4',
    title: '2023 Lamborghini Huracán',
    brand: 'Lamborghini',
    model: 'Huracán',
    year: 2023,
    mileage: 2500,
    condition: 'excellent',
    startingBid: 200000,
    currentBid: 215000,
    images: ['https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Nearly new Lamborghini Huracán with exceptional performance',
    sellerId: '2',
    sellerName: 'Supercar Gallery',
    auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Performance Package', 'Carbon Interior', 'Lift System'],
    location: 'Las Vegas, NV'
  },
  {
    id: '5',
    title: '2021 McLaren 720S',
    brand: 'McLaren',
    model: '720S',
    year: 2021,
    mileage: 6800,
    condition: 'excellent',
    startingBid: 250000,
    currentBid: 268000,
    images: ['https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Pristine McLaren 720S with low mileage',
    sellerId: '2',
    sellerName: 'Exotic Motors',
    auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Track Mode', 'Carbon Fiber Body', 'Premium Audio'],
    location: 'Chicago, IL'
  },
  {
    id: '6',
    title: '2020 Ferrari F8 Tributo',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2020,
    mileage: 9500,
    condition: 'excellent',
    startingBid: 275000,
    currentBid: 290000,
    images: ['https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800'],
    description: 'Stunning Ferrari F8 Tributo in Rosso Corsa',
    sellerId: '2',
    sellerName: 'Ferrari Specialist',
    auctionEndTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    bids: [],
    features: ['Racing Package', 'Carbon Wheels', 'Alcantara Interior'],
    location: 'Phoenix, AZ'
  }
];

export function Auctions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const { t } = useLanguage();

  const handleViewDetails = (car: Car) => {
    console.log('View details for car:', car.id);
  };

  const handlePlaceBid = (car: Car) => {
    console.log('Place bid for car:', car.id);
  };

  const filteredCars = mockCars.filter(car => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !selectedBrand || car.brand === selectedBrand;
    const matchesPrice = !priceRange || 
      (priceRange === 'under100k' && car.currentBid < 100000) ||
      (priceRange === '100k-200k' && car.currentBid >= 100000 && car.currentBid < 200000) ||
      (priceRange === 'over200k' && car.currentBid >= 200000);
    
    return matchesSearch && matchesBrand && matchesPrice;
  });

  const brands = Array.from(new Set(mockCars.map(car => car.brand)));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('nav.auctions')}
          </h1>
          <p className="text-gray-600">
            Discover exceptional vehicles from verified sellers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by make, model, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">All Prices</option>
                    <option value="under100k">Under $100K</option>
                    <option value="100k-200k">$100K - $200K</option>
                    <option value="over200k">Over $200K</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedBrand('');
                      setPriceRange('');
                    }}
                    className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {mockCars.length} auctions
          </p>
        </div>

        {/* Car Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={handleViewDetails}
              onPlaceBid={handlePlaceBid}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No auctions found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}