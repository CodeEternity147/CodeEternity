import React, { useState, useCallback, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    termsAccepted: false
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setError("");
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
    setError("");
    
    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions to continue");
      return;
    }

    try {
      const result = await login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  }, [formData, login, navigate]);

  const handleSocialLogin = useCallback((provider) => {
    console.log(`${provider} login`);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="w-full max-w-md">
        <div className="bg-gray-50 rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Welcome to CodeEternity</h1>
          </div>
          {error && (
            <div className="text-red-600 text-center mb-4 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Social Login Buttons */}
            <button
              type="button"
              className="w-full flex items-center justify-center font-semibold text-black gap-2 h-11 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleSocialLogin('Google')}
            >
              <FcGoogle className="h-5 w-5" />
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center text-black font-semibold gap-2 h-11 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition-colors"
              onClick={() => handleSocialLogin('Microsoft')}
            >
              <FaMicrosoft className="h-4 w-4 text-blue-500" />
              <span>Continue with Microsoft</span>
            </button>

            <div className="relative my-6">
              <hr className="border-gray-300" />
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-4 text-sm text-gray-500">
                OR
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  required
                  className="w-full border text-black border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full border text-black border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    required
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  By continuing, you agree to the{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-black text-white rounded hover:bg-blue-700 transition-colors"
              >
                Log in with email
              </button>
            </form>
          </div>

          <div className="pl-1 font-semibold mt-6 text-gray-900">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-700 hover:underline font-medium">
              Sign up →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
