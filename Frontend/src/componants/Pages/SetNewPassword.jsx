import React, { useState } from 'react';
import api from '../../utils/axios';
import { Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useScrollToTop from '../../hooks/useScrollToTop';

const SetNewPassword = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { email, otp } = location.state || {};
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl shadow-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Set New Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword; 