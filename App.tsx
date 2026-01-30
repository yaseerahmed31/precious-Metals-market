import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Account } from './components/Account';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { MarketPage } from './pages/MarketPage';
import { ProductPage } from './pages/ProductPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MetalPrices, MetalType, OrderDetails } from './types';
import { INITIAL_GOLD_PRICE, INITIAL_SILVER_PRICE } from './constants';
import { getSimulatedPrices } from './services/priceService';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  // --- State ---
  const [prices, setPrices] = useState<MetalPrices>({
    gold: INITIAL_GOLD_PRICE,
    silver: INITIAL_SILVER_PRICE,
    lastUpdated: new Date()
  });

  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const { user, userData, logout } = useAuth(); // Use AuthContext
  const navigate = useNavigate();

  // --- Effects ---

  // Simulate live price feed
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => getSimulatedPrices(prev));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const handleSelectCategory = (type: MetalType) => {
    navigate(`/market/${type}`);
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    setLastOrder(details);
    navigate('/confirmation');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleAccountClick = () => {
    navigate('/account');
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Navbar
        prices={prices}
        onNavigateHome={handleNavigateHome}
        onAccountClick={handleAccountClick}
        cartCount={0}
        user={user as any} // Cast to match existing component type if needed
        userData={userData}
      />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Hero onSelectCategory={handleSelectCategory} />} />
          <Route path="/market/:category" element={<MarketPage prices={prices} />} />
          <Route path="/product/:id" element={<ProductPage prices={prices} onPlaceOrder={handlePlaceOrder} />} />
          <Route path="/confirmation" element={lastOrder ? <OrderConfirmation order={lastOrder} onHome={handleNavigateHome} /> : <Navigate to="/" />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/account" element={
            <ProtectedRoute>
              <Account
                user={user as any}
                onLogout={handleLogout}
                lastOrder={lastOrder}
              />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-xl mb-6">PreciousMetals</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Crafting timeless elegance since 1985. Your trusted partner in pure gold and silver investments.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <Facebook size={20} className="hover:text-white cursor-pointer" />
              <Instagram size={20} className="hover:text-white cursor-pointer" />
              <Twitter size={20} className="hover:text-white cursor-pointer" />
              <Youtube size={20} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-yellow-600">Information</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>About Us</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Store Locator</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Careers</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-yellow-600">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Return Policy</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Shipping Policy</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer" onClick={handleNavigateHome}>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-yellow-600">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and once-in-a-lifetime deals.</p>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="bg-gray-800 text-white px-4 py-2 text-sm focus:outline-none w-full" />
              <button className="bg-yellow-700 px-4 py-2 hover:bg-yellow-600 transition-colors">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PreciousMetals Market Demo. Academic Project - Not a real trading platform.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;