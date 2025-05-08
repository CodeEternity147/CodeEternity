import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
    setError("");
    
    if (!formData.termsAccepted) {
      setError("Please accept the Terms of Use and Privacy Policy to continue.");
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        await login({ email: formData.email, password: formData.password });
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign up for CodeEternity</h2>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.lastName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border px-3 py-2 rounded mt-1"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="flex items-center mt-2 mb-2">
            <input
              type="checkbox"
              name="termsAccepted"
              id="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
              className="accent-purple-700 w-5 h-5 rounded border-2 border-gray-300 focus:ring-2 focus:ring-purple-500 transition-all duration-200 mr-2 shadow-sm hover:scale-110 cursor-pointer"
            />
            <label htmlFor="termsAccepted" className="text-sm text-gray-700 cursor-pointer select-none">
              By continuing, you agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Use</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Sign up with email
          </button>
        </form>

        <p className="pl-1 font-semibold mt-6 text-gray-900">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log in →</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
