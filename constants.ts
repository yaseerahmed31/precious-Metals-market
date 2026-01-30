import { Product } from './types';

// Approximate market rates in INR
export const INITIAL_GOLD_PRICE = 7650.00; // per gram in INR
export const INITIAL_SILVER_PRICE = 92.50; // per gram in INR

export const PRODUCTS: Product[] = [
  {
    id: 'g-bar-10',
    name: 'Gold Bar',
    type: 'gold',
    category: 'bar',
    weightGrams: 10,
    purity: '999.9 Fine Gold',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83648bfb1e25?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.05,
    description: 'A classic 10 gram gold bar from PAMP Suisse, featuring the Lady Fortuna design. Sealed in assay card for authenticity.'
  },
  {
    id: 'g-coin-1',
    name: 'Gold',
    type: 'gold',
    category: 'coin',
    weightGrams: 31.1035,
    purity: '22K Gold',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.08,
    description: 'The official gold bullion coin of the United States. Guaranteed by the U.S. government for weight and content.'
  },
  {
    id: 'g-jewel-chain',
    name: 'Gold Jewellery',
    type: 'gold',
    category: 'jewelry',
    weightGrams: 50,
    purity: '18K Gold',
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.25,
    description: 'Expertly crafted Cuban link chain. High durability and shine, perfect for wearing or investment.'
  },
  {
    id: 's-bar-1kg',
    name: '1kg Silver Bar',
    type: 'silver',
    category: 'bar',
    weightGrams: 1000,
    purity: '999 Fine Silver',
    imageUrl: 'https://images.unsplash.com/photo-1599053075553-f725a331908d?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.10,
    description: 'A hefty 1 kilogram cast silver bar. The most economical way to stack silver weight.'
  },
  {
    id: 's-coin-maple',
    name: 'Silver Coin',
    type: 'silver',
    category: 'coin',
    weightGrams: 31.1035,
    purity: '9999 Fine Silver',
    imageUrl: 'https://images.unsplash.com/photo-1605218427360-360d691e98d5?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.15,
    description: 'Features advanced security features including radial lines and a micro-engraved laser mark.'
  },
   {
    id: 's-jewel-bracelet',
    name: 'Silver Jewellery',
    type: 'silver',
    category: 'jewelry',
    weightGrams: 25,
    purity: '925 Sterling Silver',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    premiumPercent: 0.30,
    description: 'Classic sterling silver bracelet. High polish finish with durable clasp.'
  }
];

export const TRUST_BADGES = [
  { title: "Verified Purity", icon: "CheckCircle", desc: "All items tested via XRF" },
  { title: "Secure Shipping", icon: "Shield", desc: "Insured & discreet packaging" },
  { title: "Live Pricing", icon: "Activity", desc: "Real-time market updates" },
];