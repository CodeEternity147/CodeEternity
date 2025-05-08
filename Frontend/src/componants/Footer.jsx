import React from 'react';
import { Link } from 'react-router-dom';

import {
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from 'react-icons/fa6';

import img1 from '../assets/img1.svg'; // Adjust the path as needed

const Footer = () => {
  return (
    <>
      {/* Background Image */}
      <img
        src={img1}
        alt="Footer Background"
        className="w-full bg-[#ffe27c] text-[#1b1b1b] h-auto object-cover"
      />

      {/* Footer Content */}
      <footer className="bg-black text-[#faf4ee] font-sans">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-5">About Us</h3>
            <p className="text-sm leading-7 tracking-wide text-[#faf4ee]">
              CodeEternity is a technology-driven company specializing in custom software development, mobile app development, and internship programs that help businesses and individuals thrive in the digital world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400">About</a></li>
              <li><a href="/services" className="hover:text-blue-400">Services</a></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Contact Us</h3>
            <p className="text-sm"><strong>Email:</strong> info@codeeternity.com</p>
            <p className="text-sm"><strong>Phone:</strong> +91 8874 700 800</p>
            <p className="text-sm">Noida, Uttar Pradesh, India</p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-2xl font-bold mb-5">Follow Us</h3>
            <div className="flex space-x-4 text-lg text-[#faf4ee]">
              <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
              <FaXTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaLinkedinIn className="hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="hover:text-blue-400 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Newsletter and Extra Links */}
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start border-b border-gray-700">
          {/* Newsletter + Socials */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">CodeEternity</h1>
            <p className="text-sm max-w-md">
              Get the latest insights on today's tech world delivered straight to your inbox.
            </p>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="What's your e-mail?"
                className="w-full bg-white rounded-full py-3 pl-6 pr-12 text-black focus:outline-none"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#1b1b1b] border border-[#faf4ee] rounded-full px-4 text-2xl hover:bg-gray-700">
                →
              </button>
            </div>

            <p className="text-xs text-[#cccccc]">
              I confirm that I have read <span className="font-medium text-[#faf4ee]">CodeEternity's Privacy Policy</span> and agree with it.
            </p>

            <div className="flex space-x-4 text-lg">
              <FaXTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaLinkedinIn className="hover:text-blue-400 cursor-pointer" />
              <FaFacebookF className="hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Extra Links & Language */}
          <div className="flex flex-col gap-6 text-sm">
            <h3 className="text-lg font-semibold">Explore</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <a href="#" className="hover:text-blue-400">About Us</a>
              <a href="#" className="hover:text-blue-400">Careers</a>
              <a href="#" className="hover:text-blue-400">G2 Customer Reviews</a>
              <a href="#" className="hover:text-blue-400">Press & Media</a>
              <a href="#" className="hover:text-blue-400">Pricing</a>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <FaGlobe />
              <span>English</span>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button (inside footer, not fixed) */}
        <div className="flex justify-center absolute right-7 bottom-10 p-3 py-6">
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="bg-black/30 text-white text-3xl px-5 py-2  rounded-full border border-white/60 shadow-lg backdrop-blur-lg  hover:bg-black/50 transition duration-1000"
    aria-label="Scroll to top"
  >
    ↑
  </button>
</div>


        {/* Bottom Section */}
        <div className="text-sm text-[#cccccc] py-6 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} CodeEternity. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-[#faf4ee]">Disclaimer</a>
            <a href="#" className="hover:text-[#faf4ee]">Privacy Policy</a>
            <a href="#" className="hover:text-[#faf4ee]">Legal Hub</a>
            <a href="#" className="hover:text-[#faf4ee]">Whistleblower Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
