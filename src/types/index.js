// User types
export const UserRoles = {
  ADMIN: 'admin',
  SELLER: 'seller',
  BUYER: 'buyer'
};

// Car condition types
export const CarConditions = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor'
};

// Auction status types
export const AuctionStatus = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  ENDING_SOON: 'ending-soon',
  ENDED: 'ended',
  SOLD: 'sold'
};

// Language codes
export const LanguageCodes = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  AR: 'ar',
  ZH: 'zh'
};

// Bid types
export const BidTypes = {
  REGULAR: 'regular',
  AUTO: 'auto',
  RESERVE: 'reserve'
};

// Payment status
export const PaymentStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Notification types
export const NotificationTypes = {
  BID_PLACED: 'bid_placed',
  BID_OUTBID: 'bid_outbid',
  AUCTION_WON: 'auction_won',
  AUCTION_ENDED: 'auction_ended',
  PAYMENT_REMINDER: 'payment_reminder',
  SYSTEM: 'system'
};