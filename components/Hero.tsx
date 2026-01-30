import React from 'react';
import { MetalType } from '../types';

interface HeroProps {
  onSelectCategory: (type: MetalType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full bg-[#fcfbf7]">
      {/* Main Banner */}
      <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1629224316810-9d8805b95076?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Jewellery" 
          className="w-full h-full object-cover object-center"
        />
        {/* Darker Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a120b]/80 via-[#2a1b12]/40 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="max-w-2xl space-y-8 animate-fade-in-up">
              <span className="inline-block border border-[#b8860b] text-[#b8860b] bg-black/20 backdrop-blur-sm px-4 py-1 tracking-[0.3em] text-xs uppercase font-bold">Timeless Elegance</span>
              <h1 className="text-5xl md:text-8xl font-serif font-medium text-[#fffbf0] leading-[1.1]">
                The Golden <br/><span className="italic text-[#d4af37]">Standard</span>
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Discover our exquisite collection of 999.9 purity gold bars and handcrafted heritage jewellery, designed for the modern connoisseur.
              </p>
              <div className="pt-6 flex gap-5">
                <button 
                  onClick={() => onSelectCategory('gold')}
                  className="bg-[#d4af37] text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-[#b8860b] transition-colors shadow-lg"
                >
                  Shop Gold
                </button>
                <button 
                  onClick={() => onSelectCategory('silver')}
                  className="border border-white text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                >
                  Shop Silver
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collections / Categories Teaser */}
      <div className="w-full bg-gradient-to-b from-[#fcfbf7] to-[#f5f2ea] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#b8860b] text-xs font-bold tracking-[0.2em] uppercase mb-3 block">Discover</span>
            <h2 className="text-4xl font-serif font-medium text-[#2a1b12] mb-4">Shop By Category</h2>
            <div className="flex justify-center items-center gap-2">
               <div className="w-12 h-[1px] bg-[#dccbb1]"></div>
               <div className="w-2 h-2 rotate-45 border border-[#b8860b]"></div>
               <div className="w-12 h-[1px] bg-[#dccbb1]"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div onClick={() => onSelectCategory('gold')} className="group cursor-pointer relative overflow-hidden h-[450px] shadow-xl">
                <img src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute bottom-10 left-0 w-full text-center">
                   <h3 className="text-white font-serif text-3xl font-medium tracking-wide mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">GOLD</h3>
                   <span className="text-[#d4af37] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">View Collection</span>
                </div>
             </div>
             
             <div onClick={() => onSelectCategory('gold')} className="group cursor-pointer relative overflow-hidden h-[450px] shadow-xl mt-0 md:-mt-10">
                <img src="https://images.unsplash.com/photo-1602751584552-8ba42055280c?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                 <div className="absolute bottom-10 left-0 w-full text-center">
                   <h3 className="text-white font-serif text-3xl font-medium tracking-wide mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">JEWELLERY</h3>
                   <span className="text-[#d4af37] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">View Collection</span>
                </div>
             </div>

             <div onClick={() => onSelectCategory('silver')} className="group cursor-pointer relative overflow-hidden h-[450px] shadow-xl">
                <img src="https://images.unsplash.com/photo-1618403088890-3d134f24270e?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                 <div className="absolute bottom-10 left-0 w-full text-center">
                   <h3 className="text-white font-serif text-3xl font-medium tracking-wide mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">SILVER</h3>
                   <span className="text-[#d4af37] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">View Collection</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};