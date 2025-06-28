import React, { useState } from 'react';
import api from '../../utils/axios';
import { Mail, Code2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import loginimg from '../../assets/login.svg'

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
      <div className="w-full z-[999] max-w-md bg-white rounded-xl shadow-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your email to receive an OTP for password reset.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-4 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending OTP...
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send OTP
              </span>
            )}
          </button>
        </form>
        {success && <p className="text-green-500 mt-4 text-center">Check your email for the OTP.</p>}
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
      {/* SVG Image - only on large screens */}
      <div className="hidden lg:block pointer-events-none select-none">
        <img 
          src={loginimg} 
          className="absolute left-[150px] top-0 h-full max-w-none max-h-full z-[0]"
          style={{ right: 0, minWidth: '600px' }}
          alt="Login Visual" 
        />
      </div>
    </div>
  );
};

export default ForgotPassword; 