import { UserRoles, CarConditions, AuctionStatus } from '../types/index.js';

// Mock users for demo
export const mockUsers = [
  {
    id: '1',
    email: 'admin@auction.com',
    name: 'John Admin',
    role: UserRoles.ADMIN,
    joinedDate: '2024-01-01',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1-555-0101',
    verified: true,
    preferences: {
      language: 'en',
      currency: 'USD',
      notifications: true
    }
  },
  {
    id: '2',
    email: 'seller@auction.com',
    name: 'Sarah Seller',
    role: UserRoles.SELLER,
    joinedDate: '2024-02-01',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1-555-0102',
    verified: true,
    preferences: {
      language: 'en',
      currency: 'USD',
      notifications: true
    }
  },
  {
    id: '3',
    email: 'buyer@auction.com',
    name: 'Mike Buyer',
    role: UserRoles.BUYER,
    joinedDate: '2024-03-01',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+1-555-0103',
    verified: true,
    preferences: {
      language: 'en',
      currency: 'USD',
      notifications: true
    }
  }
];

// Mock cars data
export const mockCars = [
  {
    id: '1',
    title: '2022 BMW M4 Competition',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2022,
    mileage: 12500,
    condition: CarConditions.EXCELLENT,
    startingBid: 65000,
    currentBid: 72500,
    reservePrice: 70000,
    images: [
      'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Pristine BMW M4 Competition with full service history. This exceptional vehicle features carbon fiber accents, track package, and premium audio system.',
    sellerId: '2',
    sellerName: 'Premium Motors',
    auctionStartTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ACTIVE,
    bids: [
      {
        id: 'bid1',
        carId: '1',
        bidderId: '3',
        bidderName: 'Mike Buyer',
        amount: 72500,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: 'regular'
      }
    ],
    features: ['Carbon Fiber Package', 'Track Package', 'Premium Audio', 'Adaptive Suspension'],
    location: 'Los Angeles, CA',
    vin: 'WBS8M9C55N5K12345',
    engine: '3.0L Twin-Turbo I6',
    transmission: '8-Speed Automatic',
    drivetrain: 'RWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Alpine White',
    interiorColor: 'Black Merino Leather',
    category: 'Sports Car',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Good',
      tires: 'Good',
      interior: 'Excellent',
      exterior: 'Excellent'
    }
  },
  {
    id: '2',
    title: '2021 Porsche 911 Turbo S',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2021,
    mileage: 8900,
    condition: CarConditions.EXCELLENT,
    startingBid: 180000,
    currentBid: 195000,
    reservePrice: 185000,
    images: [
      'https://images.pexels.com/photos/3566158/pexels-photo-3566158.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stunning Porsche 911 Turbo S in pristine condition. Features sport package, premium interior, and carbon ceramic brakes.',
    sellerId: '2',
    sellerName: 'Luxury Autos',
    auctionStartTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ACTIVE,
    bids: [],
    features: ['Sport Package', 'Premium Interior', 'Carbon Ceramic Brakes', 'Sport Chrono Package'],
    location: 'Miami, FL',
    vin: 'WP0AB2A99MS123456',
    engine: '3.8L Twin-Turbo H6',
    transmission: '8-Speed PDK',
    drivetrain: 'AWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Guards Red',
    interiorColor: 'Black Leather',
    category: 'Sports Car',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Excellent',
      tires: 'Good',
      interior: 'Excellent',
      exterior: 'Excellent'
    }
  },
  {
    id: '3',
    title: '2020 Mercedes-AMG GT R',
    brand: 'Mercedes',
    model: 'AMG GT R',
    year: 2020,
    mileage: 15000,
    condition: CarConditions.EXCELLENT,
    startingBid: 140000,
    currentBid: 152000,
    reservePrice: 145000,
    images: [
      'https://images.pexels.com/photos/3864627/pexels-photo-3864627.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Exceptional Mercedes-AMG GT R with track performance package. Racing seats and carbon fiber elements throughout.',
    sellerId: '2',
    sellerName: 'Elite Cars',
    auctionStartTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ENDING_SOON,
    bids: [],
    features: ['Track Package', 'Carbon Fiber', 'Racing Seats', 'AMG Performance Exhaust'],
    location: 'New York, NY',
    vin: 'WDDYK8AA5LA123456',
    engine: '4.0L Twin-Turbo V8',
    transmission: '7-Speed DCT',
    drivetrain: 'RWD',
    fuelType: 'Gasoline',
    exteriorColor: 'AMG Green Hell Magno',
    interiorColor: 'Black Nappa Leather',
    category: 'Sports Car',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Excellent',
      tires: 'Good',
      interior: 'Good',
      exterior: 'Excellent'
    }
  },
  {
    id: '4',
    title: '2023 Lamborghini Huracán',
    brand: 'Lamborghini',
    model: 'Huracán',
    year: 2023,
    mileage: 2500,
    condition: CarConditions.EXCELLENT,
    startingBid: 200000,
    currentBid: 215000,
    reservePrice: 210000,
    images: [
      'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Nearly new Lamborghini Huracán with exceptional performance. Performance package and carbon interior.',
    sellerId: '2',
    sellerName: 'Supercar Gallery',
    auctionStartTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ACTIVE,
    bids: [],
    features: ['Performance Package', 'Carbon Interior', 'Lift System', 'Sport Exhaust'],
    location: 'Las Vegas, NV',
    vin: 'ZHWUC1ZF5PLA12345',
    engine: '5.2L V10',
    transmission: '7-Speed DCT',
    drivetrain: 'AWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Arancio Borealis',
    interiorColor: 'Black Alcantara',
    category: 'Supercar',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Excellent',
      tires: 'Excellent',
      interior: 'Excellent',
      exterior: 'Excellent'
    }
  },
  {
    id: '5',
    title: '2021 McLaren 720S',
    brand: 'McLaren',
    model: '720S',
    year: 2021,
    mileage: 6800,
    condition: CarConditions.EXCELLENT,
    startingBid: 250000,
    currentBid: 268000,
    reservePrice: 260000,
    images: [
      'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Pristine McLaren 720S with low mileage. Track mode, carbon fiber body, and premium audio system.',
    sellerId: '2',
    sellerName: 'Exotic Motors',
    auctionStartTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ACTIVE,
    bids: [],
    features: ['Track Mode', 'Carbon Fiber Body', 'Premium Audio', 'Adaptive Suspension'],
    location: 'Chicago, IL',
    vin: 'SBM14DCA5MW123456',
    engine: '4.0L Twin-Turbo V8',
    transmission: '7-Speed DCT',
    drivetrain: 'RWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Papaya Spark',
    interiorColor: 'Carbon Black Alcantara',
    category: 'Supercar',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Excellent',
      tires: 'Good',
      interior: 'Excellent',
      exterior: 'Excellent'
    }
  },
  {
    id: '6',
    title: '2020 Ferrari F8 Tributo',
    brand: 'Ferrari',
    model: 'F8 Tributo',
    year: 2020,
    mileage: 9500,
    condition: CarConditions.EXCELLENT,
    startingBid: 275000,
    currentBid: 290000,
    reservePrice: 280000,
    images: [
      'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Stunning Ferrari F8 Tributo in Rosso Corsa. Racing package, carbon wheels, and Alcantara interior.',
    sellerId: '2',
    sellerName: 'Ferrari Specialist',
    auctionStartTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    auctionEndTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: AuctionStatus.ACTIVE,
    bids: [],
    features: ['Racing Package', 'Carbon Wheels', 'Alcantara Interior', 'Ferrari Dynamic Enhancer'],
    location: 'Phoenix, AZ',
    vin: 'ZFF9A2A0XL0123456',
    engine: '3.9L Twin-Turbo V8',
    transmission: '7-Speed DCT',
    drivetrain: 'RWD',
    fuelType: 'Gasoline',
    exteriorColor: 'Rosso Corsa',
    interiorColor: 'Nero Alcantara',
    category: 'Supercar',
    inspectionReport: {
      overall: 'Excellent',
      engine: 'Excellent',
      transmission: 'Excellent',
      brakes: 'Excellent',
      tires: 'Good',
      interior: 'Excellent',
      exterior: 'Excellent'
    }
  }
];

// Mock notifications
export const mockNotifications = [
  {
    id: '1',
    userId: '3',
    type: 'bid_placed',
    title: 'New bid placed',
    message: 'Your bid of $72,500 has been placed on 2022 BMW M4 Competition',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    carId: '1'
  },
  {
    id: '2',
    userId: '3',
    type: 'auction_ending',
    title: 'Auction ending soon',
    message: '2020 Mercedes-AMG GT R auction ends in 1 day',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: false,
    carId: '3'
  }
];

// Mock watchlist
export const mockWatchlist = [
  {
    id: '1',
    userId: '3',
    carId: '4',
    addedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    userId: '3',
    carId: '5',
    addedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];