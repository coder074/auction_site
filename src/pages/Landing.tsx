import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Headphones, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CarCard } from '../components/CarCard';
import { Car } from '../types';

const featuredCars: Car[] = [
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
  }
];

export function Landing() {
  const { t } = useLanguage();

  const handleViewDetails = (car: Car) => {
    console.log('View details for car:', car.id);
  };

  const handlePlaceBid = (car: Car) => {
    console.log('Place bid for car:', car.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>
            <Link
              to="/auctions"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>{t('landing.hero.cta')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">50K+</div>
              <div className="text-gray-600">Cars Sold</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">25K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of car auctions with our innovative platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('landing.features.trust')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.trust.desc')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('landing.features.quality')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.quality.desc')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('landing.features.support')}
              </h3>
              <p className="text-gray-600">
                {t('landing.features.support.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Auctions
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss these exceptional vehicles
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={handleViewDetails}
                onPlaceBid={handlePlaceBid}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/auctions"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>View All Auctions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Bidding?
          </h2>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their dream cars through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/auctions"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Browse Auctions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}