export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'seller' | 'buyer';
  avatar?: string;
  phone?: string;
  joinedDate: string;
}

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  startingBid: number;
  currentBid: number;
  reservePrice?: number;
  images: string[];
  description: string;
  sellerId: string;
  sellerName: string;
  auctionEndTime: string;
  status: 'upcoming' | 'active' | 'ended' | 'sold';
  bids: Bid[];
  features: string[];
  location: string;
}

export interface Bid {
  id: string;
  carId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
}