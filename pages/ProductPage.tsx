import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { getProductById } from '../services/productService';
import { MetalPrices, Product, OrderDetails } from '../types';

interface ProductPageProps {
    prices: MetalPrices;
    onPlaceOrder: (details: OrderDetails) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ prices, onPlaceOrder }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            setLoading(true);
            const data = await getProductById(id);
            setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center">Loading details...</div>;
    }

    if (!product) {
        return (
            <div className="p-8 text-center bg-gray-50 min-h-screen pt-20">
                <h2 className="text-2xl font-serif text-[#2a1b12] mb-4">Product not found</h2>
                <button onClick={() => navigate('/')} className="text-[#b8860b] underline hover:text-[#9a7009]">
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <ProductDetail
            product={product}
            currentPrices={prices}
            onBack={() => navigate(-1)}
            onPlaceOrder={onPlaceOrder}
        />
    );
};
