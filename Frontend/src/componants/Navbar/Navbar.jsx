import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'What We Offer', path: '/whatweoffer' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
            Home
          </Link>
          <Link
            to="/whatweoffer"
            className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/whatweoffer' ? 'text-blue-600' : ''
            }`}
          >
            What We Offer
          </Link>
          <Link
            to="/about"
            className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/about' ? 'text-blue-600' : ''
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/contact' ? 'text-blue-600' : ''
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 