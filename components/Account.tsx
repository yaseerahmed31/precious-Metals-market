import React, { useState, useEffect } from 'react';
import { User, OrderDetails } from '../types';
import { getUserOrders } from '../services/orderService';
import { Package, User as UserIcon, MapPin, LogOut, ChevronRight, Clock } from 'lucide-react';

interface AccountProps {
  user: User;
  userData?: any;
  onLogout: () => void;
  lastOrder: OrderDetails | null;
}

export const Account: React.FC<AccountProps> = ({ user, onLogout, lastOrder }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === 'orders' && (user as any).uid) {
        setLoadingOrders(true);
        try {
          // Assuming user has uid, which is true for Firebase User
          const data = await getUserOrders((user as any).uid);
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoadingOrders(false);
        }
      }
    };
    fetchOrders();
  }, [activeTab, user]);

  return (
    <div className="min-h-screen bg-[#fcfbf7] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-[#2a1b12] mb-1">My Account</h1>
            <p className="text-gray-500 text-sm">Welcome back, <span className="font-bold text-[#b8860b]">{user?.name || 'User'}</span></p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-sm font-bold text-red-700 hover:text-red-900 uppercase tracking-wider"
          >
            <LogOut size={16} className="mr-2" /> Sign Out
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-[#f0e6d2] overflow-hidden">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'orders' ? 'bg-[#faf8f5] border-[#b8860b] text-[#2a1b12]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                <Package size={18} className="mr-3" /> Orders
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'profile' ? 'bg-[#faf8f5] border-[#b8860b] text-[#2a1b12]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                <UserIcon size={18} className="mr-3" /> Profile Details
              </button>
              <button
                onClick={() => setActiveTab('address')}
                className={`w-full flex items-center px-6 py-4 text-sm font-medium transition-colors border-l-4 ${activeTab === 'address' ? 'bg-[#faf8f5] border-[#b8860b] text-[#2a1b12]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                <MapPin size={18} className="mr-3" /> Addresses
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {/* Current Order (from App State) */}
                {lastOrder && (
                  <div className="bg-white rounded-xl border border-[#b8860b] shadow-md p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#b8860b] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">New</div>
                    <h3 className="text-lg font-serif text-[#2a1b12] mb-4">Latest Order</h3>
                    <div className="flex flex-col sm:flex-row gap-6">
                      <img src={lastOrder.product.imageUrl} className="w-24 h-24 object-cover rounded-md" alt="Product" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="font-bold text-[#2a1b12]">{lastOrder.product.name}</span>
                          <span className="font-mono text-[#2a1b12]">₹{lastOrder.totalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">{lastOrder.product.purity} • {lastOrder.product.weightGrams}g x {lastOrder.quantity}</p>
                        <div className="flex items-center text-xs text-green-600 font-bold uppercase tracking-wide">
                          <Clock size={14} className="mr-1" /> Processing
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Past Orders List */}
                <div className="bg-white rounded-xl shadow-sm border border-[#f0e6d2] p-6">
                  <h3 className="text-lg font-serif text-[#2a1b12] mb-6">Order History</h3>

                  {loadingOrders ? (
                    <div className="text-center py-8 text-gray-500">Loading orders...</div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No past orders found.</div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div key={order.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-dashed border-[#e5e0d1] last:border-0 last:pb-0">
                          <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img src={order.product?.imageUrl} className="w-full h-full object-cover" alt={order.product?.name} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <p className="font-medium text-[#2a1b12] text-sm">{order.product?.name}</p>
                                <p className="text-xs text-gray-400">
                                  Ord #{order.id.slice(0, 8)} • {order.createdAt?.toDate ? new Date(order.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                                </p>
                              </div>
                              <span className="font-mono text-sm">₹{order.totalPrice?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold uppercase">{order.status || 'Confirmed'}</span>
                              <button className="text-xs text-[#b8860b] font-bold uppercase hover:underline">View Invoice</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#f0e6d2] p-8">
                <h3 className="text-lg font-serif text-[#2a1b12] mb-6 border-b border-[#f0e6d2] pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" value={user?.name || ''} readOnly className="w-full bg-[#faf8f5] border border-[#e5e0d1] rounded px-4 py-3 text-sm text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" value={user.email} readOnly className="w-full bg-[#faf8f5] border border-[#e5e0d1] rounded px-4 py-3 text-sm text-gray-600 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input type="text" value={user.phone} readOnly className="w-full bg-[#faf8f5] border border-[#e5e0d1] rounded px-4 py-3 text-sm text-gray-600 cursor-not-allowed" />
                  </div>
                </div>
                <div className="mt-8">
                  <button className="bg-[#2a1b12] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#b8860b] transition-colors rounded">Edit Profile</button>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div className="bg-white rounded-xl shadow-sm border border-[#f0e6d2] p-8">
                <div className="flex justify-between items-center mb-6 border-b border-[#f0e6d2] pb-4">
                  <h3 className="text-lg font-serif text-[#2a1b12]">Saved Addresses</h3>
                  <button className="text-[#b8860b] text-xs font-bold uppercase hover:underline">+ Add New</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-[#b8860b] bg-[#fffbf2] rounded-lg p-5 relative">
                    <span className="absolute top-4 right-4 text-[10px] font-bold text-[#b8860b] uppercase border border-[#b8860b] px-2 py-0.5 rounded">Default</span>
                    <h4 className="font-bold text-[#2a1b12] text-sm mb-2">Home</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      123, Heritage Avenue, <br />
                      Jubilee Hills, Hyderabad, <br />
                      Telangana - 500033
                    </p>
                    <div className="flex gap-4 text-xs font-medium text-gray-500">
                      <button className="hover:text-[#2a1b12]">Edit</button>
                      <button className="hover:text-red-600">Delete</button>
                    </div>
                  </div>

                  <div className="border border-[#e5e0d1] rounded-lg p-5">
                    <h4 className="font-bold text-[#2a1b12] text-sm mb-2">Office</h4>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Tech Park, Building 4B, <br />
                      Hi-Tech City, Hyderabad, <br />
                      Telangana - 500081
                    </p>
                    <div className="flex gap-4 text-xs font-medium text-gray-500">
                      <button className="hover:text-[#2a1b12]">Edit</button>
                      <button className="hover:text-red-600">Delete</button>
                      <button className="text-[#b8860b]">Set as Default</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};