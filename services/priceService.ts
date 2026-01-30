import { MetalPrices } from '../types';
import { INITIAL_GOLD_PRICE, INITIAL_SILVER_PRICE } from '../constants';

// Helper to generate a random fluctuation
const fluctuate = (currentPrice: number, volatility: number): number => {
  const change = (Math.random() - 0.5) * volatility;
  return parseFloat((currentPrice + change).toFixed(2));
};

export const getSimulatedPrices = (currentPrices?: MetalPrices): MetalPrices => {
  const goldBase = currentPrices ? currentPrices.gold : INITIAL_GOLD_PRICE;
  const silverBase = currentPrices ? currentPrices.silver : INITIAL_SILVER_PRICE;

  // Gold fluctuates by up to ₹25, Silver by ₹1.50
  return {
    gold: fluctuate(goldBase, 25.00),
    silver: fluctuate(silverBase, 1.50),
    lastUpdated: new Date()
  };
};