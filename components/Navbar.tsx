import React from 'react';
import { Search, ShoppingBag, User as UserIcon, Heart, Menu, MapPin, Phone } from 'lucide-react';
import { MetalPrices, User } from '../types';

interface NavbarProps {
  prices: MetalPrices;
  onNavigateHome: () => void;
  onAccountClick: () => void;
  cartCount?: number;
  user: User | null;
  userData: any | null;
}

export const Navbar: React.FC<NavbarProps> = ({ prices, onNavigateHome, onAccountClick, cartCount = 0, user, userData }) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-md flex flex-col">
      {/* Top Bar - Corporate/Ticker - Dark Luxury Brown */}
      <div className="bg-[#4a3426] text-xs py-2 px-4 border-b border-[#5c4233] hidden md:block text-[#eaddcf]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center hover:text-white transition-colors cursor-pointer"><Phone size={12} className="mr-1 text-yellow-500" /> +91 123 456 7890</span>
            <span className="flex items-center hover:text-white transition-colors cursor-pointer"><MapPin size={12} className="mr-1 text-yellow-500" /> Store Locator</span>
          </div>
          <div className="flex space-x-6 font-medium">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 font-bold">GOLD 22K:</span>
              <span>₹{prices.gold.toFixed(0)}/g</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">SILVER:</span>
              <span>₹{prices.silver.toFixed(0)}/g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white px-4 py-4 md:py-6 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-8">

          {/* Mobile Menu */}
          <button className="md:hidden p-2 text-gray-700">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={onNavigateHome}
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="font-serif text-2xl md:text-4xl font-bold text-[#2a1b12] tracking-wide uppercase">
                Precious<span className="text-[#b8860b]">Metals</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase hidden md:block mt-1">Heritage Since 1985</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-grow max-w-xl relative">
            <input
              type="text"
              placeholder="Search for Gold, Silver, Coins..."
              className="w-full bg-[#f9f9f9] border border-gray-200 rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
            />
            <button className="absolute right-1 top-1 h-[calc(100%-8px)] w-10 bg-[#b8860b] rounded-full text-white flex items-center justify-center hover:bg-[#9a7009] transition-colors">
              <Search size={16} />
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5 md:space-x-8 text-[#4a3426]">
            {userData?.role === 'admin' && (
              <button className="hidden md:flex flex-col items-center hover:text-[#b8860b] transition-colors group">
                <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-[#b8860b] border border-[#b8860b] px-2 py-1 rounded">
                  Admin
                </span>
              </button>
            )}
            <button
              onClick={onAccountClick}
              className="hidden md:flex flex-col items-center hover:text-[#b8860b] transition-colors group"
            >
              <UserIcon size={22} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-[#b8860b]">
                {user?.name?.split(' ')[0] || 'Account'}
              </span>
            </button>
            <button className="hidden md:flex flex-col items-center hover:text-[#b8860b] transition-colors group">
              <Heart size={22} className="mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wider group-hover:text-[#b8860b]">Wishlist</span>
            </button>
            <button className="flex flex-col items-center hover:text-[#b8860b] transition-colors relative group">
              <div className="relative">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b8860b] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase mt-1 group-hover:text-[#b8860b] hidden md:block tracking-wider">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:block bg-[#2a1b12] text-white shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-center space-x-14 py-3.5">
          {['New Arrivals', 'Gold', 'Silver', 'Coins', 'Collections', 'Gifts', 'Offers'].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
              className="text-xs font-semibold uppercase tracking-[0.15em] hover:text-[#b8860b] transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-4 left-0 w-0 h-0.5 bg-[#b8860b] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};