import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductList } from './components/ProductList';
import { ProductDetail } from './components/ProductDetail';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Auth } from './components/Auth';
import { Account } from './components/Account';
import { MetalPrices, Product, MetalType, ViewState, OrderDetails, User } from './types';
import { PRODUCTS, INITIAL_GOLD_PRICE, INITIAL_SILVER_PRICE } from './constants';
import { getSimulatedPrices } from './services/priceService';
import { Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [prices, setPrices] = useState<MetalPrices>({
    gold: INITIAL_GOLD_PRICE,
    silver: INITIAL_SILVER_PRICE,
    lastUpdated: new Date()
  });

  const [view, setView] = useState<ViewState>('home');
  const [selectedCategory, setSelectedCategory] = useState<MetalType>('gold');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // --- Effects ---
  
  // Simulate live price feed
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => getSimulatedPrices(prev));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---

  const navigateToHome = () => {
    setView('home');
    setSelectedProduct(null);
  };

  const handleSelectCategory = (type: MetalType) => {
    setSelectedCategory(type);
    setView('listing');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    // Scroll to top
    window.scrollTo(0,0);
  };

  const handleBackToList = () => {
    setView('listing');
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    setLastOrder(details);
    setView('confirmation');
    window.scrollTo(0,0);
  };

  const handleAccountClick = () => {
    if (user) {
      setView('account');
    } else {
      setView('auth');
    }
    window.scrollTo(0,0);
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('account');
    window.scrollTo(0,0);
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
    window.scrollTo(0,0);
  };

  // --- Filtered Data ---
  const filteredProducts = PRODUCTS.filter(p => p.type === selectedCategory);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Navbar 
        prices={prices} 
        onNavigateHome={navigateToHome} 
        onAccountClick={handleAccountClick}
        cartCount={0}
        user={user}
      />

      <main className="flex-grow">
        {view === 'home' && (
          <Hero onSelectCategory={handleSelectCategory} />
        )}

        {view === 'listing' && (
          <ProductList 
            products={filteredProducts}
            currentPrices={prices}
            selectedCategory={selectedCategory}
            onProductClick={handleProductClick}
            onBack={navigateToHome}
          />
        )}

        {view === 'detail' && selectedProduct && (
          <ProductDetail 
            product={selectedProduct}
            currentPrices={prices}
            onBack={handleBackToList}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {view === 'confirmation' && lastOrder && (
          <OrderConfirmation 
            order={lastOrder}
            onHome={navigateToHome}
          />
        )}

        {view === 'auth' && (
          <Auth 
            onLogin={handleLogin}
            onNavigateHome={navigateToHome}
          />
        )}

        {view === 'account' && user && (
          <Account 
            user={user}
            onLogout={handleLogout}
            lastOrder={lastOrder}
          />
        )}
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
               <Facebook size={20} className="hover:text-white cursor-pointer"/>
               <Instagram size={20} className="hover:text-white cursor-pointer"/>
               <Twitter size={20} className="hover:text-white cursor-pointer"/>
               <Youtube size={20} className="hover:text-white cursor-pointer"/>
             </div>
           </div>
           
           <div>
             <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-yellow-600">Information</h4>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="hover:text-white cursor-pointer">About Us</li>
               <li className="hover:text-white cursor-pointer">Store Locator</li>
               <li className="hover:text-white cursor-pointer">Careers</li>
               <li className="hover:text-white cursor-pointer">Contact Us</li>
             </ul>
           </div>

           <div>
             <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-yellow-600">Customer Care</h4>
             <ul className="space-y-3 text-sm text-gray-400">
               <li className="hover:text-white cursor-pointer">Return Policy</li>
               <li className="hover:text-white cursor-pointer">Shipping Policy</li>
               <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
               <li className="hover:text-white cursor-pointer">Privacy Policy</li>
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