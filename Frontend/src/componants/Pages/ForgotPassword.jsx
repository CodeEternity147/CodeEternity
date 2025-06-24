import React, { useState } from 'react';
import api from '../../utils/axios';
import { Mail } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';

const ForgotPassword = () => {
  useScrollToTop();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await api.post('/auth/request-password-reset', { email });
      toast.success('If the email exists, an OTP has been sent.');
      setSuccess(true);
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 rounded-2xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Forgot Password</h2>
        <p className="text-gray-400 mb-6 text-center">Enter your email to receive an OTP for password reset.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl shadow-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
        {success && <p className="text-green-400 mt-4 text-center">Check your email for the OTP.</p>}
      </div>
    </div>
  );
};

export default ForgotPassword; 