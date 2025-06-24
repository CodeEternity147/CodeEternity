import React, { useState, useCallback, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2, Code2, Sparkles, Zap, Phone } from "lucide-react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
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
        mobile: "",
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
    if (!formData.email && !formData.mobile) {
      toast.error("Please enter your email or mobile number");
      setLoading(false);
      return;
    }
    if (formData.mobile && !/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error("Mobile number must be 10 digits.");
      setLoading(false);
      return;
    }

    try {
      const toastId = toast.loading("Logging in...");
      const result = await login({ 
        email: formData.email, 
        mobile: formData.mobile,
        password: formData.password 
      });
      
      toast.dismiss(toastId);
      if (result.success) {
        toast.success("Login successful!");
        // Redirect to the page the user came from, or default to dashboard
        const redirectTo = location.state?.from?.pathname || '/dashboard';
        navigate(redirectTo, { replace: true });
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.dismiss();
      const backendMessage = error.response?.data?.message || error.message || 'Login failed';
      toast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, login, navigate, location.state?.from?.pathname]);

  const handleSocialLogin = useCallback((provider) => {
    toast.info(`${provider} login coming soon!`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-purple-500/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Code2 className="absolute top-20 left-20 text-violet-400/60 w-8 h-8 animate-float" />
        <Zap className="absolute top-32 right-32 text-cyan-400/60 w-6 h-6 animate-float delay-700" />
        <Sparkles className="absolute bottom-32 left-32 text-fuchsia-400/60 w-7 h-7 animate-float delay-1000" />
        <Code2 className="absolute bottom-20 right-20 text-violet-400/60 w-5 h-5 animate-float delay-300" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full max-w-6xl lg:max-h-[800px] flex flex-col lg:flex-row overflow-y-auto lg:overflow-visible rounded-2xl lg:rounded-3xl shadow-2xl">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 backdrop-blur-xl border border-white/10 rounded-t-2xl lg:rounded-t-none lg:rounded-l-3xl p-6 lg:p-8 flex-col justify-center items-center relative overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.8) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.8) 0%, transparent 50%)
              `
            }}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl mb-8 shadow-2xl">
              <Code2 className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-6 leading-tight">
              CodeEternity
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We Create Future
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-fuchsia-500 rounded-full animate-bounce delay-200"></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-400"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-b-2xl lg:rounded-b-none lg:rounded-r-3xl shadow-2xl flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* Form Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="lg:hidden inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl mb-4 shadow-lg">
                <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">Sign in to your account</p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Work email"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Mobile Field */}
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  value={formData.mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>

              {/* Password Field */}
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 transition-colors group-focus-within:text-violet-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-14 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-violet-400 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1.5 w-5 h-5 text-violet-600 bg-white/5 border-2 border-white/20 rounded focus:ring-violet-500 focus:ring-2"
                  required
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-400 leading-5">
                  By continuing, you agree to the{' '}
                  <a href="/terms-and-conditions" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Terms of Use
                  </a>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <span className="text-sm text-violet-400 hover:underline cursor-pointer" onClick={() => navigate('/forgot-password')}>
                  Forgot Password?
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold shadow-2xl hover:shadow-violet-500/25 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-4 focus:ring-violet-500/50 bg-size-200 hover:bg-pos-100 text-sm sm:text-base"
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

            {/* Signup Link */}
            <div className="text-center mt-8 pt-6 border-t border-white/10">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200"
                >
                  Sign up →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .hover\\:bg-pos-100:hover {
          background-position: 100% 100%;
        }
      `}</style>
    </div>
  );
}