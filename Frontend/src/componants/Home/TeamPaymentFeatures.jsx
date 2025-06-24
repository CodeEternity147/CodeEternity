import React, { useState, useRef, useEffect } from 'react';
import features from '../../data/FeatureData';
import { Link } from 'react-router-dom';

const TeamPaymentFeatures = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const totalItems = features.length;
  const [isVisible, setIsVisible] = useState(false);

  const getCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return Math.min(1, totalItems);
      if (window.innerWidth < 768) return Math.min(2, totalItems);
      if (window.innerWidth < 1024) return Math.min(3, totalItems);
      if (window.innerWidth < 1280) return Math.min(4, totalItems);
    }
    return Math.min(5, totalItems);
  };

  useEffect(() => {
    setVisibleCount(getCount());
    const handleResize = () => setVisibleCount(getCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalItems]);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        handleAdvance();
      }, 2500); // Slightly longer interval for smoother experience
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, totalItems]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAdvance = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStartIdx((prev) => (prev + 1) % totalItems);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 500);
  };

  const handleDotClick = (idx) => {
    if (startIdx === idx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStartIdx(idx);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  const getVisibleFeatures = () => {
    const arr = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push(features[(startIdx + i) % totalItems]);
    }
    return arr;
  };
  const visibleFeatures = getVisibleFeatures();

  return (
    <section className="bg-gradient-to-b from-[#FFF8F0] to-[#F9F4FF] py-16 w-full overflow-hidden">
      <div className={`text-center mb-12 px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl transform -rotate-1 scale-105"></div>
    <div className="relative z-10 py-2 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">Code</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-700">Eternity</span>
        <div className="mt-1">
          <span className="relative inline-block mr-2">
            <span className="relative text-indigo-700 z-10">Help you to Build</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-200 rounded-md -z-10 transform -rotate-1"></span>
          </span>
          <span className="text-gray-800">Faster,</span>
          <span className="relative inline-block ml-2">
            <span className="relative text-purple-700 z-10">Together</span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-200 rounded-md -z-10 transform rotate-1"></span>
          </span>
        </div>
      </h1>
                    
      <p className="text-gray-600 max-w-2xl mx-auto mt-6 text-sm sm:text-base md:text-lg">
        <span className="font-medium">Empowering businesses</span> with cutting-edge technology solutions and <span className="font-medium">digital transformation</span> services.
      </p>
                    
      <div className="mt-8 flex justify-center">
        <button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10 flex items-center space-x-2">
            <span>Our Services - Future-Ready Offerings</span>
            
          </span>
          <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </button>
      </div>
                    
      <div className="mt-6 flex justify-center space-x-2">
        <div className="h-1 w-16 rounded-full bg-indigo-300"></div>
        <div className="h-1 w-8 rounded-full bg-purple-400"></div>
        <div className="h-1 w-4 rounded-full bg-pink-300"></div>
      </div>
    </div>
  </div>
</div>

      <div
        className="relative px-4 sm:px-6 overflow-visible"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`flex justify-center items-stretch gap-3 md:gap-6 transition-all duration-400 ease-out w-full ${
            isTransitioning ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
          }`}
        >
          {visibleFeatures.map((feature, idx) => (
            <Link
              to="/contactCodeEternity"
              key={`${feature.title}-${idx}`}
              className="flex flex-col justify-end items-center shadow-xl hover:shadow-2xl transition-all duration-500 ease-out transform hover:scale-105 group relative cursor-pointer"
              style={{
                borderRadius: '24px',
                minWidth: 0,
                width: `calc(100%/${visibleCount} - 1rem)`,
                aspectRatio: '1 / 1.2',
                backgroundImage: `linear-gradient(to top, rgba(17,24,39,0.7), rgba(17,24,39,0.1)), url('${feature.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Top shine effect */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
              
              {/* Border glow on hover - more subtle */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 rounded-3xl border-2 border-blue-400/40 blur"></div>
                <div className="absolute inset-0 rounded-3xl border border-blue-300/20"></div>
              </div>
              
              {/* Overlay animation */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500"></div>
              
              {/* Floating indicator at top */}
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-400/80 shadow-lg shadow-blue-400/50 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Particle effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
              </div>
              
              {/* Content - with fixed heights for consistent sizing */}
              <div className="p-4 sm:p-6 text-white text-center w-full backdrop-blur-[2px] rounded-b-3xl transition-all duration-500 bg-gradient-to-t from-black/60 via-black/40 to-black/10 group-hover:bg-gradient-to-t group-hover:from-black/70 group-hover:to-black/20 group-hover:p-6" style={{ minHeight: '180px' }}>
                <div className="relative">
                  {/* Icon above title */}
                  <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-full bg-blue-500/20 border border-blue-400/30 group-hover:bg-blue-500/30 transition-all duration-500">
                    <div className="w-5 h-5 bg-blue-400/90 rounded-md transform rotate-45 group-hover:rotate-[135deg] transition-all duration-700"></div>
                  </div>
                  
                  <h2 className="text-xl font-bold  group-hover:text-blue-300 transition-all duration-300 transform group-hover:-translate-y-1 h-[50px] flex items-center justify-center">
                    {feature.title}
                  </h2>
                  
                  <p className=" text-gray-200 group-hover:text-white transition-all duration-500 transform opacity-90 group-hover:opacity-100 h-[60px] overflow-hidden">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots Navigation - Enhanced */}
      <div className="flex justify-center mt-8 gap-3">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`transition-all duration-500 ${
              startIdx % totalItems === idx 
                ? 'w-6 h-3 bg-purple-600 rounded-full scale-110 shadow-md shadow-indigo-300' 
                : 'w-3 h-3 bg-gray-400 hover:bg-gray-600 rounded-full hover:scale-110'
            }`}
            aria-label={`Go to feature ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TeamPaymentFeatures;