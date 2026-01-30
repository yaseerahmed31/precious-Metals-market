export type MetalType = 'gold' | 'silver';

export interface Product {
  id: string;
  name: string;
  type: MetalType;
  category: 'coin' | 'bar' | 'jewelry';
  weightGrams: number;
  purity: string; // e.g., "99.99%", "24K"
  imageUrl: string;
  premiumPercent: number; // The fee added on top of spot price
  description: string;
}

export interface MetalPrices {
  gold: number; // Price per gram in INR
  silver: number; // Price per gram in INR
  lastUpdated: Date;
}

export interface OrderDetails {
  product: Product;
  quantity: number;
  spotPriceAtLock: number;
  totalPrice: number;
  orderId: string;
  timestamp: Date;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
}

export type ViewState = 'home' | 'listing' | 'detail' | 'confirmation' | 'auth' | 'account';