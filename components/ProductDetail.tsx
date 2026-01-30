import React, { useState } from 'react';
import { Product, MetalPrices, OrderDetails } from '../types';
import { ArrowLeft, Minus, Plus, Share2, Heart, Shield, Truck, Clock } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  currentPrices: MetalPrices;
  onBack: () => void;
  onPlaceOrder: (details: OrderDetails) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  currentPrices, 
  onBack,
  onPlaceOrder
}) => {
  const [quantity, setQuantity] = useState(1);

  const spotPricePerGram = product.type === 'gold' ? currentPrices.gold : currentPrices.silver;
  
  // Calculations
  const totalWeight = product.weightGrams * quantity;
  const metalValue = totalWeight * spotPricePerGram;
  const premiumValue = metalValue * product.premiumPercent;
  const totalPrice = metalValue + premiumValue;

  const handleOrder = () => {
    onPlaceOrder({
      product,
      quantity,
      spotPriceAtLock: spotPricePerGram,
      totalPrice,
      orderId: Math.random().toString(36).substr(2, 9).toUpperCase(),
      timestamp: new Date()
    });
  };

  return (
    <div className="bg-[#fcfbf7] min-h-screen pb-20">
       {/* Breadcrumb Area */}
       <div className="bg-[#f2efe6] py-6 mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <button 
              onClick={onBack}
              className="flex items-center text-xs font-bold uppercase tracking-widest text-[#5c4233] hover:text-[#b8860b] transition-colors"
            >
              <ArrowLeft size={14} className="mr-2" /> Back to Collection
            </button>
          </div>
       </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-[#f0e6d2] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="aspect-[4/5] bg-[#fafafa] rounded-lg overflow-hidden relative shadow-inner">
                 <img 
                   src={product.imageUrl} 
                   alt={product.name} 
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                 />
                 <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:text-[#b8860b] transition-colors text-gray-400">
                   <Heart size={20} />
                 </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className={`aspect-square rounded-md overflow-hidden cursor-pointer border ${i === 1 ? 'border-[#b8860b]' : 'border-transparent'}`}>
                      <img src={product.imageUrl} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col py-2">
              <span className="text-[#b8860b] font-bold text-xs uppercase tracking-[0.2em] mb-3">Purity Guarantee</span>
              <h1 className="text-3xl lg:text-5xl font-serif text-[#2a1b12] mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-6 mb-8 pb-8 border-b border-[#f0e6d2]">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Purity</span>
                  <span className="font-medium text-[#2a1b12]">{product.purity}</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Weight</span>
                  <span className="font-medium text-[#2a1b12]">{product.weightGrams}g</span>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center text-green-700 bg-green-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                   In Stock
                </div>
              </div>

              <div className="mb-8">
                 <p className="text-gray-600 leading-7 font-light text-lg">
                   {product.description} An embodiment of luxury and tradition, perfect for your portfolio or as a timeless gift.
                 </p>
              </div>

              <div className="bg-[#fcfbf7] p-6 rounded-xl border border-[#f0e6d2] mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                   <span className="text-4xl font-serif font-medium text-[#2a1b12]">₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                   <span className="text-xs text-gray-500 font-medium">(Inclusive of all taxes)</span>
                </div>
                
                <div className="text-sm text-gray-500 space-y-1">
                   <p className="flex justify-between items-center py-1 border-b border-dashed border-[#e5e0d1]">
                     <span>Live Metal Rate</span> 
                     <span className="font-mono text-[#2a1b12]">₹{spotPricePerGram.toFixed(0)}/g</span>
                   </p>
                   <p className="flex justify-between items-center py-1">
                     <span>Making & Premium</span> 
                     <span className="font-mono text-[#2a1b12]">{(product.premiumPercent * 100).toFixed(1)}%</span>
                   </p>
                </div>
              </div>

              <div className="flex gap-4 mb-10">
                <div className="flex items-center border border-gray-300 rounded bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-50 text-gray-500"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-[#2a1b12]">{quantity}</span>
                  <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="p-4 hover:bg-gray-50 text-gray-500"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button 
                  onClick={handleOrder}
                  className="flex-1 bg-[#2a1b12] text-white uppercase tracking-[0.2em] font-bold text-sm hover:bg-[#b8860b] transition-colors shadow-lg rounded"
                >
                  Add to Cart
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm text-[#5c4233] mt-auto">
                 <div className="flex items-start gap-3">
                   <Shield size={20} className="text-[#b8860b] mt-0.5 flex-shrink-0"/>
                   <div>
                     <span className="font-bold block mb-1">BIS Hallmarked</span>
                     <span className="text-xs text-gray-500 leading-snug">Certified for purity and authenticity.</span>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <Truck size={20} className="text-[#b8860b] mt-0.5 flex-shrink-0"/>
                   <div>
                     <span className="font-bold block mb-1">Insured Shipping</span>
                     <span className="text-xs text-gray-500 leading-snug">100% insurance coverage during transit.</span>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <Share2 size={20} className="text-[#b8860b] mt-0.5 flex-shrink-0"/>
                   <div>
                     <span className="font-bold block mb-1">Lifetime Exchange</span>
                     <span className="text-xs text-gray-500 leading-snug">Exchange at prevailing market rates.</span>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <Clock size={20} className="text-[#b8860b] mt-0.5 flex-shrink-0"/>
                   <div>
                     <span className="font-bold block mb-1">24/7 Support</span>
                     <span className="text-xs text-gray-500 leading-snug">Dedicated assistance for all queries.</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};