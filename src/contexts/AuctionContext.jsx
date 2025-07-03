import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockCars, mockNotifications, mockWatchlist } from '../utils/mockData.js';
import { AuctionStatus } from '../types/index.js';

const AuctionContext = createContext();

export function AuctionProvider({ children }) {
  const [cars, setCars] = useState(mockCars);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [watchlist, setWatchlist] = useState(mockWatchlist);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    year: '',
    condition: '',
    location: '',
    status: ''
  });

  // Update auction statuses based on time
  useEffect(() => {
    const updateAuctionStatuses = () => {
      const now = new Date();
      setCars(prevCars => 
        prevCars.map(car => {
          const endTime = new Date(car.auctionEndTime);
          const timeLeft = endTime.getTime() - now.getTime();
          
          let newStatus = car.status;
          if (timeLeft <= 0) {
            newStatus = AuctionStatus.ENDED;
          } else if (timeLeft <= 24 * 60 * 60 * 1000) { // 24 hours
            newStatus = AuctionStatus.ENDING_SOON;
          } else {
            newStatus = AuctionStatus.ACTIVE;
          }
          
          return { ...car, status: newStatus };
        })
      );
    };

    updateAuctionStatuses();
    const interval = setInterval(updateAuctionStatuses, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const addCar = (newCar) => {
    setCars(prevCars => [newCar, ...prevCars]);
  };

  const placeBid = (carId, bidAmount, bidderId, bidderName) => {
    const car = cars.find(c => c.id === carId);
    if (!car || bidAmount <= car.currentBid) {
      return false;
    }

    const newBid = {
      id: `bid_${Date.now()}`,
      carId,
      bidderId,
      bidderName,
      amount: bidAmount,
      timestamp: new Date().toISOString(),
      type: 'regular'
    };

    setCars(prevCars =>
      prevCars.map(c =>
        c.id === carId
          ? {
              ...c,
              currentBid: bidAmount,
              bids: [...c.bids, newBid]
            }
          : c
      )
    );

    // Add notification
    const notification = {
      id: `notif_${Date.now()}`,
      userId: bidderId,
      type: 'bid_placed',
      title: 'Bid placed successfully',
      message: `Your bid of $${bidAmount.toLocaleString()} has been placed on ${car.title}`,
      timestamp: new Date().toISOString(),
      read: false,
      carId
    };

    setNotifications(prev => [notification, ...prev]);

    return true;
  };

  const addToWatchlist = (userId, carId) => {
    const exists = watchlist.find(w => w.userId === userId && w.carId === carId);
    if (exists) return false;

    const newWatchItem = {
      id: `watch_${Date.now()}`,
      userId,
      carId,
      addedDate: new Date().toISOString()
    };

    setWatchlist(prev => [...prev, newWatchItem]);
    return true;
  };

  const removeFromWatchlist = (userId, carId) => {
    setWatchlist(prev => prev.filter(w => !(w.userId === userId && w.carId === carId)));
  };

  const isInWatchlist = (userId, carId) => {
    return watchlist.some(w => w.userId === userId && w.carId === carId);
  };

  const getWatchlistCars = (userId) => {
    const userWatchlist = watchlist.filter(w => w.userId === userId);
    return userWatchlist.map(w => cars.find(c => c.id === w.carId)).filter(Boolean);
  };

  const getUserBids = (userId) => {
    const userBids = [];
    cars.forEach(car => {
      const userCarBids = car.bids.filter(bid => bid.bidderId === userId);
      userCarBids.forEach(bid => {
        userBids.push({
          ...bid,
          car,
          isWinning: car.currentBid === bid.amount
        });
      });
    });
    return userBids.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  };

  const markAllNotificationsAsRead = (userId) => {
    setNotifications(prev =>
      prev.map(n =>
        n.userId === userId ? { ...n, read: true } : n
      )
    );
  };

  const getFilteredCars = () => {
    return cars.filter(car => {
      const matchesSearch = !searchTerm || 
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !filters.brand || car.brand === filters.brand;
      
      const matchesPrice = !filters.priceRange || 
        (filters.priceRange === 'under100k' && car.currentBid < 100000) ||
        (filters.priceRange === '100k-200k' && car.currentBid >= 100000 && car.currentBid < 200000) ||
        (filters.priceRange === '200k-300k' && car.currentBid >= 200000 && car.currentBid < 300000) ||
        (filters.priceRange === 'over300k' && car.currentBid >= 300000);

      const matchesYear = !filters.year ||
        (filters.year === '2020-2021' && car.year >= 2020 && car.year <= 2021) ||
        (filters.year === '2022-2023' && car.year >= 2022 && car.year <= 2023) ||
        (filters.year === '2024+' && car.year >= 2024);

      const matchesCondition = !filters.condition || car.condition === filters.condition;
      const matchesStatus = !filters.status || car.status === filters.status;

      return matchesSearch && matchesBrand && matchesPrice && matchesYear && matchesCondition && matchesStatus;
    });
  };

  return (
    <AuctionContext.Provider value={{
      cars,
      notifications,
      watchlist,
      searchTerm,
      setSearchTerm,
      filters,
      setFilters,
      addCar,
      placeBid,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
      getWatchlistCars,
      getUserBids,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      getFilteredCars
    }}>
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
}