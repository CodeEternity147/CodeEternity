import React from 'react';
import Header from '../Navbar/Header';
import {
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import useScrollToTop from '../../hooks/useScrollToTop';

const CareerPage = () => {
  useScrollToTop();
  return (
    <div className="bg-purple-100 min-h-screen py-24 font-sans">
    <Header></Header>
    <div className=" text-gray-900 min-h-screen pt-8 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center shadow-lg relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500 opacity-20 animate-pulse mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-indigo-500 opacity-30 animate-pulse animation-delay-2000 mix-blend-screen pointer-events-none"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 flex items-center justify-center gap-4 tracking-wide drop-shadow-lg">
          <FaBriefcase className="text-yellow-300 animate-bounce" />
          Careers at Code Eternity
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light tracking-wide drop-shadow-sm">
          Join our journey of transforming ideas into impactful digital experiences.
        </p>
      </section>

      {/* Why Work With Us */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 tracking-wide">
          Why Work With Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { emoji: '🚀', title: 'Fast Growth' },
            { emoji: '💻', title: 'Remote Friendly' },
            { emoji: '🎯', title: 'Impactful Projects' },
            { emoji: '🌱', title: 'Learn Daily' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-tr from-purple-50 to-indigo-50 rounded-2xl p-8 text-center shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <div className="text-6xl mb-4 animate-pulse">{item.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-800 tracking-wide">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16  px-6 max-w-4xl mx-auto text-center text-gray-700 tracking-wide bg-gradient-to-r from-gray-100 to-gray-50 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-wide">
          Get in Touch
        </h2>
        <p className="mb-5 text-lg text-gray-700 italic">
          Have questions or want to apply? Reach out to us anytime.
        </p>
        <p className="flex justify-center items-center gap-3 text-indigo-600 text-lg font-semibold hover:text-indigo-800 transition-colors cursor-pointer">
          <FaEnvelope className="text-xl" />
          <a href="mailto:info@codeeternity.com" className="underline">
            info@codeeternity.com
          </a>
        </p>
        <p className="flex justify-center items-center gap-3 mt-6 text-gray-600 text-sm md:text-base font-medium">
          <FaMapMarkerAlt className="text-lg text-pink-500" />
          COMMERCIAL MARKET BLOCK H, SECTOR 63, NOIDA UTTAR PRADESH, 201301
        </p>
      </section>
    </div>
    
    </div>
  );
};

export default CareerPage;
