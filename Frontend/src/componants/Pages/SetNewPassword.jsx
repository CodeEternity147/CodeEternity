import React, { useState } from 'react';
import api from '../../utils/axios';
import { Lock, Code2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useScrollToTop from '../../hooks/useScrollToTop';
import svg from '../../assets/login.svg';

const SetNewPassword = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { email, otp } = location.state || {};
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!email || !otp) {
    return <div className="text-center text-red-500 mt-10">Invalid access. Please restart the password reset process.</div>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword: form.newPassword });
      toast.success('Password reset successful! Logging you in...');
      // Log in automatically
      await login({ email, password: form.newPassword });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
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
          Set New Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Set New Password'}
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

export default SetNewPassword; 