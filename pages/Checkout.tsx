import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { OrderDetails } from '../types';

export const CheckoutPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const orderDetails = location.state?.order as OrderDetails;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!orderDetails) {
        return <div className="p-8">No order details found. <button onClick={() => navigate('/')} className="underline">Go Home</button></div>;
    }

    const handleConfirmOrder = async () => {
        if (!user) {
            navigate('/login', { state: { from: location } });
            return;
        }

        setLoading(true);
        setError('');

        try {
            await createOrder(user.uid, orderDetails);
            // Navigate to confirmation with simple success flag or order ID
            // Pass the details again so Confirmation page can render them without fetching
            navigate('/confirmation', { state: { order: orderDetails } });
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-[#2a1b12] text-white">
                    <h2 className="text-xl font-serif">Checkout</h2>
                </div>

                <div className="p-6 space-y-6">
                    {/* Product Review */}
                    <div className="flex gap-4 border-b border-gray-100 pb-6">
                        <img
                            src={orderDetails.product.imageUrl}
                            alt={orderDetails.product.name}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{orderDetails.product.name}</h3>
                            <p className="text-sm text-gray-500">{orderDetails.product.weightGrams}g • {orderDetails.product.purity}</p>
                            <p className="text-sm text-gray-500">Qty: {orderDetails.quantity}</p>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="bg-yellow-50 p-4 rounded-md">
                        <h4 className="font-semibold text-[#b8860b] mb-2">Order Summary</h4>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Spot Price (Locked):</span>
                            <span>₹{orderDetails.spotPriceAtLock.toFixed(2)}/g</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t border-yellow-200">
                            <span>Total Amount:</span>
                            <span>₹{orderDetails.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-600 hover:text-gray-900 px-4 py-2"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleConfirmOrder}
                            disabled={loading}
                            className="bg-[#b8860b] text-white px-8 py-3 rounded-md hover:bg-[#9a7009] transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Confirm & Pay'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
