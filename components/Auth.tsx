import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  onNavigateHome: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigateHome }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const userData: User = {
      name: isLogin ? "Demo User" : name,
      email: email,
      phone: isLogin ? "+91 9876543210" : phone
    };
    onLogin(userData);
  };

  return (
    <div className="min-h-[80vh] bg-[#fcfbf7] flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-[#f0e6d2] overflow-hidden">
        {/* Header Toggle */}
        <div className="flex border-b border-[#f0e6d2]">
          <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${isLogin ? 'bg-white text-[#b8860b] border-b-2 border-[#b8860b]' : 'bg-[#faf8f5] text-gray-500 hover:text-[#2a1b12]'}`}
            onClick={() => setIsLogin(true)}
          >
            Sign In
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${!isLogin ? 'bg-white text-[#b8860b] border-b-2 border-[#b8860b]' : 'bg-[#faf8f5] text-gray-500 hover:text-[#2a1b12]'}`}
            onClick={() => setIsLogin(false)}
          >
            Create Account
          </button>
        </div>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif text-[#2a1b12] mb-2">{isLogin ? 'Welcome Back' : 'Join Membership'}</h2>
            <p className="text-sm text-gray-500">{isLogin ? 'Access your portfolio and order history' : 'Experience the finest in precious metals'}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#5c4233] uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fcfbf7] border border-[#e5e0d1] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5c4233] uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#fcfbf7] border border-[#e5e0d1] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#5c4233] uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#fcfbf7] border border-[#e5e0d1] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
               <div className="flex justify-between items-center mb-2">
                 <label className="block text-xs font-bold text-[#5c4233] uppercase tracking-wider">Password</label>
                 {isLogin && (
                   <a href="#" className="text-xs text-[#b8860b] hover:text-[#9a7009]">Forgot Password?</a>
                 )}
               </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#fcfbf7] border border-[#e5e0d1] rounded px-4 py-3 text-sm focus:outline-none focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2a1b12] text-white py-4 text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#b8860b] transition-colors rounded shadow-lg mt-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
             <button onClick={onNavigateHome} className="text-xs text-gray-400 hover:text-[#2a1b12] uppercase tracking-wider border-b border-transparent hover:border-gray-900 transition-all pb-0.5">
               Return to Store
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};