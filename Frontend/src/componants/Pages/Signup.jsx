import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import loginanimaion from "../../data/signup.json"
import svg from '../../assets/login.svg'
import Lottie from "lottie-react";


import { toast } from 'react-toastify';
import { Eye, EyeOff, Mail, Lock, User, Code2, Phone } from 'lucide-react';
import useScrollToTop from '../../hooks/useScrollToTop';

const Signup = () => {
  useScrollToTop();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss();
    if (!formData.termsAccepted) {
      toast.error("Please accept the Terms of Use and Privacy Policy to continue.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be 10 digits.");
      setLoading(false);
      return;
    }
    try {
      const toastId = toast.loading("Creating your account...");
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });
      toast.dismiss(toastId);
      toast.success("Account created successfully!");
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        await login({ email: formData.email, password: formData.password });
        toast.success("Welcome to CodeEternity!");
        const redirectTo = location.state?.from?.pathname || '/dashboard';
        navigate(redirectTo, { replace: true });
      }
    } catch (error) {
      toast.dismiss();
      const backendMessage = error.response?.data?.message || error.message || 'Registration failed. Please try again.';
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen overflow-hidden bg-[#C4B1F9] flex flex-col lg:flex-row items-center justify-center relative overflow-x-hidden">
      {/* Mobile Heading for signup page */}
      <div className="block lg:hidden w-full flex flex-col items-center justify-center mt-4 mb-2 text-center">
        <h2 className="text-3xl font-extrabold text-black leading-tight my-2">Start Your Learning Journey</h2>
        <span className="bg-white px-3 py-1 mt-1 inline-block text-xl font-bold">With CodeEternity</span>
      </div>
      {/* Left Side - Branding/Marketing (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 flex-col z-[999] relative overflow-hidden justify-center items-center px-8 min-h-screen">
        <div className="w-3/5 mx-auto flex flex-col items-center justify-center">
          <div className="hidden lg:block absolute top-6 left-8 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="w-7 h-7 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-black">CodeEternity.</h1>
          </div>
        </div>
        <div className="hidden lg:flex w-full justify-center items-center mb-1 lg:mb-0">
              <Lottie animationData={loginanimaion} loop={true} className="w-1/2 lg:w-3/5 max-w-[180px] lg:max-w-[320px] max-h-auto" />
            </div>
          <h2 className="text-4xl lg:text-4xl xl:text-5xl font-extrabold text-black leading-tight mt-4 text-center">
            Start Your Learning Journey
          </h2>
          <span className="bg-white px-3 py-2 mt-3 inline-block text-3xl  font-bold">
            With CodeEternity
          </span>
          <p className="text-base lg:text-[18px] text-gray-800 mt-4 mb-6 text-center">
            Create your account to access certified programs, hands-on projects, and a vibrant tech community.
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
      {/* Right Side - Signup Form */}
      <div className="flex flex-col z-[999] border border-gray-300 shadow-4xl justify-center items-center w-full max-w-md bg-white rounded-xl shadow-2xl mx-auto my-2 lg:my-8 lg:mr-32 p-6 sm:p-8 mb-8">
        <div className="w-full px-1 sm:px-2">
          <div className="w-full max-w-sm mx-auto">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 text-center">Create Account</h3>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-full pl-12 pr-4 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-14 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
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
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-purple-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-14 py-3 lg:py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-gray-50 text-sm lg:text-base"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
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
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 lg:py-4 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4 lg:mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    Sign up
                  </span>
                )}
              </button>
            </form>
            <p className="mt-6 lg:mt-8 text-center text-xs lg:text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Log in →
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
};

export default Signup;