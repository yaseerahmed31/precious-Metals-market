import { PRODUCTS } from '../constants';
import { Product, MetalType } from '../types';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (type?: MetalType): Promise<Product[]> => {
    // await delay(500); // Optional: Simulate network latency
    if (type) {
        return PRODUCTS.filter(p => p.type === type);
    }
    return PRODUCTS;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    // await delay(300);
    return PRODUCTS.find(p => p.id === id);
};
