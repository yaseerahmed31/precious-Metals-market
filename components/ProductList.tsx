import React from 'react';
import { Product, MetalPrices, MetalType } from '../types';
import { ChevronRight, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  currentPrices: MetalPrices;
  selectedCategory: MetalType;
  onProductClick: (product: Product) => void;
  onBack: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  currentPrices, 
  selectedCategory,
  onProductClick,
  onBack
}) => {
  const spotPrice = selectedCategory === 'gold' ? currentPrices.gold : currentPrices.silver;

  return (
    <div className="bg-[#fcfbf7] min-h-screen">
      {/* Breadcrumb - Warm Beige Background */}
      <div className="bg-[#f2efe6] py-4 border-b border-[#e5e0d1]">
        <div className="max-w-7xl mx-auto px-4 flex items-center text-xs text-gray-500 tracking-wide uppercase font-medium">
          <span className="cursor-pointer hover:text-[#b8860b] transition-colors" onClick={onBack}>Home</span>
          <ChevronRight size={12} className="mx-2 text-gray-400" />
          <span className="text-[#2a1b12] font-bold">{selectedCategory} Collection</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters - White Card on Colored Background */}
          <div className="w-full lg:w-64 flex-shrink-0 hidden lg:block">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
               <h3 className="font-serif text-lg text-[#2a1b12] mb-6 flex justify-between items-center border-b border-gray-100 pb-4">
                 Filters <SlidersHorizontal size={16} className="text-[#b8860b]"/>
               </h3>
               
               {/* Price Filter */}
               <div className="mb-8">
                 <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Price Range</h4>
                 <div className="space-y-3">
                   {['₹10k - ₹50k', '₹50k - ₹1L', 'Above ₹1L'].map((label, idx) => (
                      <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center group-hover:border-[#b8860b]">
                           {/* Simulated Check */}
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-[#b8860b] transition-colors">{label}</span>
                      </label>
                   ))}
                 </div>
               </div>

               {/* Purity Filter */}
               <div className="mb-6">
                 <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Purity</h4>
                 <div className="space-y-3">
                   {['24K (999)', '22K (916)', '18K (750)'].map((label, idx) => (
                      <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center group-hover:border-[#b8860b]"></div>
                        <span className="text-sm text-gray-600 group-hover:text-[#b8860b] transition-colors">{label}</span>
                      </label>
                   ))}
                 </div>
               </div>
             </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
             {/* Header */}
             <div className="flex justify-between items-end mb-8 border-b border-[#e5e0d1] pb-4">
               <div>
                 <span className="text-[#b8860b] text-xs font-bold uppercase tracking-widest mb-1 block">Exclusive</span>
                 <h1 className="text-3xl font-serif text-[#2a1b12] capitalize">
                   {selectedCategory}
                 </h1>
               </div>
               <div className="flex items-center text-sm text-gray-500">
                 <span className="mr-4 hidden sm:inline">{products.length} Products Found</span>
                 <div className="flex items-center cursor-pointer border border-[#e5e0d1] rounded-full px-4 py-2 bg-white hover:border-[#b8860b] transition-colors">
                   Sort By: Recommended <ChevronDown size={14} className="ml-2" />
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.map((product) => {
                const metalCost = spotPrice * product.weightGrams;
                const premium = metalCost * product.premiumPercent;
                const estimatedTotal = metalCost + premium;

                return (
                  <div 
                    key={product.id}
                    onClick={() => onProductClick(product)}
                    className="group cursor-pointer flex flex-col bg-white p-4 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#f0e6d2]"
                  >
                    <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden mb-5 rounded-lg">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-x-4 bottom-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                         <button className="w-full bg-[#2a1b12] text-white font-medium py-3 uppercase text-xs tracking-widest hover:bg-[#b8860b] transition-colors rounded">
                           Quick View
                         </button>
                      </div>
                      <div className="absolute top-0 right-0 bg-[#d4af37] text-white text-[10px] uppercase font-bold px-3 py-1.5 tracking-wider rounded-bl-lg shadow-sm">
                        Best Seller
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <h3 className="font-serif text-lg text-[#2a1b12] group-hover:text-[#b8860b] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex justify-center items-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
                        <span>{product.purity}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span>{product.weightGrams}g</span>
                      </div>
                      <div className="pt-2 flex justify-center items-center gap-3 border-t border-dashed border-gray-100 mt-2">
                         <span className="text-[#2a1b12] font-bold text-lg">₹{estimatedTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                         <span className="text-xs text-gray-400 line-through">₹{(estimatedTotal * 1.1).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};