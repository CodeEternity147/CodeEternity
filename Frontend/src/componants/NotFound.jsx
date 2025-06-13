import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-white/10 backdrop-blur-lg p-12 rounded-2xl shadow-2xl max-w-2xl w-full text-center border border-white/20">
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-white mb-6">Oops! Page Not Found</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-8"></div>
        </div>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            We're currently working on something amazing for this page!
          </p>
          <p className="text-sm">
            While our team puts the finishing touches, why not explore our other exciting features?
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Return to Home
          </Link>
          <div className="mt-4">
            <Link
              to="/whatweoffer"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Explore Our Services →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          <p>Need help? <Link to="/contactCodeEternity" className="text-blue-400 hover:text-blue-300">Contact our support team</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 