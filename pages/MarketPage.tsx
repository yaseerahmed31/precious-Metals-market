import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { getProducts } from '../services/productService';
import { MetalPrices, Product, MetalType } from '../types';

interface MarketPageProps {
    prices: MetalPrices;
}

export const MarketPage: React.FC<MarketPageProps> = ({ prices }) => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const selectedCategory = (category === 'silver' ? 'silver' : 'gold') as MetalType;

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts(selectedCategory);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, [selectedCategory]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading products...</div>;
    }

    return (
        <ProductList
            products={products}
            currentPrices={prices}
            selectedCategory={selectedCategory}
            onProductClick={(product) => navigate(`/product/${product.id}`)}
            onBack={() => navigate('/')}
        />
    );
};
