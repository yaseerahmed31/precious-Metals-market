import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle, Printer, ArrowRight } from 'lucide-react';

interface OrderConfirmationProps {
  order: OrderDetails;
  onHome: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onHome }) => {
  return (
    <div className="min-h-screen bg-[#fcfbf7] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-[#f0e6d2] overflow-hidden text-center p-8 md:p-12 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#2a1b12] via-[#b8860b] to-[#2a1b12]"></div>
          
          <div className="w-24 h-24 bg-[#f0fdf4] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          
          <h1 className="text-4xl font-serif font-medium text-[#2a1b12] mb-4">Order Confirmed</h1>
          <p className="text-gray-500 mb-10 max-w-md mx-auto">
            Thank you for your purchase. Your order has been placed successfully and a confirmation email has been sent to you.
          </p>

          <div className="bg-[#fcfbf7] rounded-xl p-8 text-left border border-[#f0e6d2] mb-10">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-[#e5e0d1]">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Order ID</span>
              <span className="font-mono font-bold text-[#2a1b12] text-lg">#{order.orderId}</span>
            </div>

            <div className="flex items-start space-x-6 mb-6">
               <img src={order.product.imageUrl} alt={order.product.name} className="w-20 h-20 rounded-lg object-cover shadow-sm" />
               <div className="flex-1">
                 <h3 className="font-serif text-lg text-[#2a1b12] font-medium mb-1">{order.product.name}</h3>
                 <p className="text-sm text-gray-500 mb-1">{order.product.purity} • {order.product.weightGrams}g</p>
                 <p className="text-sm font-bold text-[#b8860b]">Qty: {order.quantity}</p>
               </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Spot Price Locked</span>
                <span className="font-mono">₹{order.spotPriceAtLock.toFixed(2)}/g</span>
              </div>
              <div className="flex justify-between text-[#2a1b12] font-bold text-xl pt-4 border-t border-[#e5e0d1] mt-2">
                <span>Total Amount Paid</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.print()}
              className="flex items-center justify-center px-8 py-3.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-[#2a1b12] transition-colors font-bold text-sm uppercase tracking-wide"
            >
              <Printer size={18} className="mr-2" /> Print Receipt
            </button>
            <button 
              onClick={onHome}
              className="flex items-center justify-center px-8 py-3.5 bg-[#2a1b12] text-white rounded-lg hover:bg-[#b8860b] transition-colors font-bold text-sm uppercase tracking-wide"
            >
              Continue Shopping <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          <div className="mt-10 text-xs text-[#856404] bg-[#fff3cd] p-4 rounded border border-[#ffeeba]">
            <strong>Academic Demo Note:</strong> No actual payment was processed. This is a simulation for evaluation purposes only.
          </div>
        </div>
      </div>
    </div>
  );
};