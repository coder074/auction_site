import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Award, Headphones, ArrowRight, Clock, TrendingUp, Star, Users, Car as CarIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuction } from '../contexts/AuctionContext.jsx';
import { CarCard } from '../components/CarCard.jsx';
import { CarDetailModal } from '../components/CarDetailModal.jsx';
import { BidModal } from '../components/BidModal.jsx';

export function Landing() {
  const { t } = useLanguage();
  const { cars } = useAuction();
  const [selectedCar, setSelectedCar] = useState(null);
  const [showCarDetail, setShowCarDetail] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);

  // Get featured cars (first 3 active auctions)
  const featuredCars = cars.filter(car => car.status === 'active').slice(0, 3);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    setShowCarDetail(true);
  };

  const handlePlaceBid = (car) => {
    setSelectedCar(car);
    setShowBidModal(true);
  };

  const testimonials = [
    {
      id: 1,
      name: 'Michael Johnson',
      role: 'Car Collector',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Found my dream Porsche through this platform. The process was seamless and transparent.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'First-time Buyer',
      avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Excellent customer service and genuine sellers. Highly recommend for luxury car purchases.',
      rating: 5
    },
    {
      id: 3,
      name: 'David Chen',
      role: 'Auto Dealer',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'As a seller, I appreciate the professional platform and quality buyers it attracts.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white overflow-hidden">
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
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/auctions"
                className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>{t('landing.hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                <span>Join Now</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">50K+</div>
              <div className="text-gray-600">{t('landing.stats.cars')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">98%</div>
              <div className="text-gray-600">{t('landing.stats.success')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">25K+</div>
              <div className="text-gray-600">{t('landing.stats.customers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">15+</div>
              <div className="text-gray-600">{t('landing.stats.experience')}</div>
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

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to buy or sell your dream car
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Register</h3>
              <p className="text-gray-600">
                Create your account and get verified to start bidding or selling
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CarIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Browse & Bid</h3>
              <p className="text-gray-600">
                Explore our curated selection and place bids on your favorite vehicles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Win & Drive</h3>
              <p className="text-gray-600">
                Complete the purchase and arrange delivery of your new vehicle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Trusted by thousands of car enthusiasts worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
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