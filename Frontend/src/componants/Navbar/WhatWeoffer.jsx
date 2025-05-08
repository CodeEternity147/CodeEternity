import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import data from '../../data/data'; // Adjust the path as necessary
import ImgCard from './ImgCard';
import RightCard from './RightCard';

function WhatWeOffer() {
  const { whatWeOffer } = data;
  const [index, setIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="animate-fadeIn transition-opacity duration-500 ease-in-out flex flex-col lg:flex-row min-h-screen bg-[#f9fafb] relative z-40">
      {/* Toggle Button (visible on small screens) */}
      <button className="lg:hidden p-4 text-xl" onClick={toggleSidebar}>
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white shadow-md p-6 border-r border-gray-300 lg:static absolute top-16 left-0 z-50 w-64 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <h1 className="text-xl font-bold mb-4">What we offer</h1>
        {whatWeOffer.map((item, i) => (
          <div
            key={i}
            onClick={() => {
              setIndex(item.index);
              setSidebarOpen(false);
            }}
            className={`cursor-pointer p-3 rounded-md mb-2 hover:bg-blue-50 font-medium ${
              index === item.index ? 'bg-blue-100 text-black' : ''
            }`}
            style={
              index === item.index
                ? { backgroundColor: item.iconBgColor, color: '#000' }
                : {}
            }
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          <RightCard index={index} />
        </div>
        <div>
          <ImgCard index={index} />
        </div>
      </div>
    </div>
  );
}

export default WhatWeOffer;