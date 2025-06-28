import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';
import { Eye, KeyRound, Mail, Lock, User, Code2, Phone } from 'lucide-react';

import { toast } from 'react-toastify';
import svg from '../../assets/login.svg'

import { useNavigate, useLocation } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';

const VerifyOTP = () => {
  useScrollToTop();
  const [form, setForm] = useState({ email: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setForm(f => ({ ...f, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/verify-otp', form);
      toast.success('OTP verified!');
      navigate('/set-new-password', { state: { email: form.email, otp: form.otp } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP is wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#C4B1F9] flex flex-col lg:flex-row items-center justify-center p-4 relative">
       {/* Logo/Heading for mobile/tablet */}
       <div className="block lg:hidden w-full flex justify-center mt-8 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-7 h-7 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-black">CodeEternity</h1>
        </div>
      </div>
      {/* Logo/Heading for desktop (absolute, top left) */}
      <div className="hidden lg:flex absolute top-6 left-8 z-20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-7 h-7 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-black">CodeEternity</h1>
        </div>
      </div>
      <div className="w-full z-[999] max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              value={form.otp}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </div>
      {/* SVG Image - only on large screens */}
      <div className="hidden lg:block pointer-events-none select-none">
         <img 
           src={svg} 
           className="absolute left-[150px] top-0 h-full max-w-none max-h-full z-[0]"
           style={{ right: 0, minWidth: '600px' }}
           alt="Login Visual" 
         />
      </div>
    </div>
  );
};

export default VerifyOTP;
