import React, { useState, useEffect, useRef } from 'react';
import { FaArrowDown, FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from '../../assets/Logo.png';

function Header({ showOffer, setshowOffer, showServe, setshowServe }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const menuRef = useRef(null);

  // Helper to get initials
  const getInitials = () => {
    if (!user) return "U"; // U for User
    const { firstName, lastName } = user;
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const whatWeOffer = () => {

    navigate('/whatWeOffer');

  };

  const handleArrow2 = () => {
    navigate('/whoweServe');
  };

  return (
    <>
      <header className="px-6 py-4  w-[95%] mx-auto flex justify-between items-center shadow-md fixed top-5 left-0 right-0 z-50 bg-white backdrop-blur-md rounded-xl">
        <img
          src={Logo}
          alt="CodeEternity Logo"
          className="h-8 md:h-10 w-auto object-contain"
          style={{ maxHeight: '40px' }}
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 absolute left-1/2 transform -translate-x-1/2 font-inter text-[16px] tracking-wide">
  {[
    { to: "/", label: "Home" },
    { isButton: true, onClick: whatWeOffer, label: "What we offer" },
    { isButton: true, onClick: handleArrow2, label: "Who we serve" },
    { to: "/contactCodeEternity", label: "Contact" },
    { to: "/career", label: "Career" },
    { to: "/LMSpage", label: "LMS Login" },
  ].map((item, idx) =>
    item.isButton ? (
      <button
        key={idx}
        onClick={item.onClick}
        className="relative font-medium text-gray-900 hover:text-blue-600 transition-all duration-300 ease-in-out bg-transparent border-none cursor-pointer group"
      >
        {item.label}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </button>
    ) : (
      <Link
        key={idx}
        to={item.to}
        className="relative font-medium text-gray-900 hover:text-blue-600 transition-all duration-300 ease-in-out group"
      >
        {item.label}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    )
  )}
</nav>


        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <button
                className="border border-gray-700 text-gray-700 hover:bg-gray-100 py-2 px-5 rounded-full transition-all duration-200"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-black text-white py-2 px-5 rounded-full transition-all duration-200 shadow-md"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                className="bg-blue-100 text-blue-800 font-medium rounded-full w-8 h-8 flex items-center justify-center text-lg focus:outline-none"
                title="Profile"
                onClick={() => navigate('/dashboard')}
              >
                {getInitials()}
              </button>
              <button
                className="border text-white bg-black border-gray-700 hover:bg-gray-100 hover:text-black py-2 px-4 rounded-full transition-all duration-200"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
  <div
    ref={menuRef}
    className="fixed top-[calc(5rem+1.25rem)] left-[2.5%] right-[2.5%] bg-white shadow-lg rounded-xl p-4 md:hidden flex flex-col space-y-4 z-50 animate-slideDown font-inter text-[16px] tracking-wide"
  >
    {/* Nav Items */}
    {[
      { to: "/", label: "Home" },
      {
        isButton: true,
        onClick: () => {
          whatWeOffer();
          setMenuOpen(false);
        },
        label: "What we offer",
      },
      {
        isButton: true,
        onClick: () => {
          handleArrow2();
          setMenuOpen(false);
        },
        label: "Who we serve",
      },
      { to: "/contactCodeEternity", label: "Contact" },
      { to: "/career", label: "Career" },
      { to: "/LMSpage", label: "LMS Login" },
    ].map((item, i) =>
      item.isButton ? (
        <button
          key={i}
          onClick={item.onClick}
          className="relative text-left font-medium text-gray-900 hover:text-blue-600 transition-all duration-300 ease-in-out bg-transparent border-none cursor-pointer group px-4 py-2 rounded-lg"
        >
          {item.label}
          <span className="absolute left-4 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
        </button>
      ) : (
        <Link
          key={i}
          to={item.to}
          onClick={() => setMenuOpen(false)}
          className="relative font-medium text-gray-900 hover:text-blue-600 transition-all duration-300 ease-in-out group px-4 py-2 rounded-lg"
        >
          {item.label}
          <span className="absolute left-4 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
        </Link>
      )
    )}

    {/* Auth Buttons */}
    <div className="border-t pt-4 mt-2">
      {!user ? (
        <div className="flex flex-col space-y-3">
          <button
            className="border border-gray-700 text-gray-700 hover:bg-gray-100 py-2 px-5 rounded-full transition-all duration-200 w-full"
            onClick={() => {
              navigate('/login');
              setMenuOpen(false);
            }}
          >
            Login
          </button>
          <button
            className="bg-black text-white py-2 px-5 rounded-full transition-all duration-200 shadow-md w-full"
            onClick={() => {
              navigate('/signup');
              setMenuOpen(false);
            }}
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between space-x-3">
          <button
            className="bg-blue-100 text-blue-800 font-medium rounded-full w-10 h-10 flex items-center justify-center text-lg focus:outline-none"
            title="Profile"
            onClick={() => {
              navigate('/dashboard');
              setMenuOpen(false);
            }}
          >
            {getInitials()}
          </button>
          <button
            className="border text-white bg-black border-gray-700 hover:bg-gray-100 py-2 px-4 rounded-full flex-1 transition-all duration-200"
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}

      </header>
    </>
  );
}

export default Header;

