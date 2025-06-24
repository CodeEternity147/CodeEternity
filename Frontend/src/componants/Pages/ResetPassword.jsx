import React, { useState } from 'react';
import api from '../../utils/axios';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { toast } from 'react-toastify';
import useScrollToTop from '../../hooks/useScrollToTop';

const ResetPassword = () => {
  useScrollToTop();
  const [form, setForm] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/reset-password', {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword
      });
      toast.success('Password reset successful!');
      setSuccess(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative group">
            <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
              value={form.otp}
              onChange={handleChange}
              required
            />
          </div>
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
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {success && <p className="text-green-400 mt-4 text-center">Password reset successful! You can now log in.</p>}
      </div>
    </div>
  );
};

export default ResetPassword; 