import React, { useState, useCallback, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Code2, Sparkles, Zap, Phone } from "lucide-react";
import Lottie from "lottie-react";
import loginanimaion from "../../data/Login.json"
import svg from '../../assets/login.svg'
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import useScrollToTop from '../../hooks/useScrollToTop';

export default function LoginPage() {
  useScrollToTop();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setFormData({
        email: "",
        password: "",
        termsAccepted: false
      });
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions to continue");
      setLoading(false);
      return;
    }
    if (!formData.email) {
      toast.error("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const toastId = toast.loading("Logging in...");
      const result = await login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      toast.dismiss(toastId);
      if (result.success) {
        toast.success("Login successful!");
        // Redirect to the page the user came from, or default to dashboard
        const redirectTo = location.state?.from?.pathname || '/dashboard';
        navigate(redirectTo, { replace: true });
      } else {
        let errorMsg = result && result.error ? result.error : 'Login failed';
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.dismiss();
      const backendMessage = error?.response?.data?.message || error?.message || 'Login failed';
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, login, navigate, location.state?.from?.pathname]);

  const handleSocialLogin = useCallback((provider) => {
    toast.info(`${provider} login coming soon!`);
  }, []);

  return (
    <div className="max-h-screen bg-[#C4B1F9] flex flex-col lg:flex-row items-center justify-center relative overflow-x-hidden">
      {/* Left Side - Marketing Content (visible on all screens) */}
      <div className="flex flex-1 flex-col z-[999] relative overflow-hidden">
        {/* Logo - Fixed at top left (desktop only) */}
        <div className="hidden lg:block absolute top-6 left-8 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="w-7 h-7 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-black">CodeEternity.</h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-start lg:justify-center items-center px-3 lg:px-8 min-h-screen">
          <div className="w-full lg:w-3/5 mx-auto flex flex-col items-center justify-center pt-4 lg:pt-0">
            {/* Animation at the top */}
            <div className="hidden lg:flex w-full justify-center items-center mb-1 lg:mb-0">
              <Lottie animationData={loginanimaion} loop={true} className="w-1/2 lg:w-3/5 max-w-[180px] lg:max-w-[320px] max-h-auto" />
            </div>
            {/* Main Heading and Content */}
            <div className="w-full max-w-2xl text-center">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-black leading-tight ">
                Transform Your Tech Career
              </h2>
              <span className="bg-white px-3 py-2 mt-1 inline-block text-xl sm:text-xl lg:text-3xl font-bold">
                With CodeEternity
              </span>
              <p className="text-base sm:text-lg lg:text-[18px] text-gray-800 mt-3 mb-4">
                Certified training with real-world projects — from Web Dev to AI, level up your skills.
              </p>
              <button
                onClick={() => navigate('/whatweoffer')}
                className="inline-flex items-center px-5 py-2 bg-white rounded-lg text-black font-semibold hover:bg-gray-100 transition-all duration-200 shadow border border-gray-300 text-base mt-2 mb-2"
              >
                Explore Programs
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col z-[999] border border-gray-300 shadow-4xl justify-center items-center w-full max-w-md bg-white rounded-xl shadow-2xl mx-auto my-2 lg:my-28 lg:mr-32 p-6 sm:p-8 mb-16">
        <div className="w-full px-0 sm:px-8">
          <div className="w-full max-w-sm mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Welcome Back</h3>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-3 lg:space-y-4">
              {/* Email Field */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-14 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 py-1 lg:py-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-purple-600 bg-white border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  required
                />
                <label htmlFor="termsAccepted" className="text-xs lg:text-sm text-gray-600 leading-5">
                  By continuing, you agree to the{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/terms-and-conditions')}
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Terms of Use
                  </button>
                  {' '}and{' '}
                  <button 
                    type="button"
                    onClick={() => navigate('/privacy-policy')}
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button 
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs lg:text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-black text-white py-3 lg:py-4 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4 lg:mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-5 h-5" />
                    Log in with email
                  </span>
                )}
              </button>
            </div>

            {/* Sign up link */}
            <p className="mt-6 lg:mt-8 text-center text-xs lg:text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                onClick={() => navigate('/signup')}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Sign up →
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* SVG Image - visible on all screens */}
      <div className="block pointer-events-none select-none">
         <img 
           src={svg} 
           className="absolute left-[650px] top-0 h-full max-w-none max-h-full z-[0]"
           style={{ right: 0, minWidth: '600px' }}
           alt="Login Visual" 
         />
      </div>
    </div>
  );
}