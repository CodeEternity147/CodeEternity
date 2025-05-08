import React from 'react';

import { BsGrid3X3Gap } from 'react-icons/bs';
import {
  FaArrowRight,
  FaBuilding,
  FaShieldAlt,
  FaThLarge,
  FaUsers,
} from 'react-icons/fa';

import { serviceData } from '../../data/serviceData.js';

const iconMap = {
  FaUsers: <FaUsers size={18} />,
  FaBuilding: <FaBuilding size={18} />,
  BsGrid3X3Gap: <BsGrid3X3Gap size={18} />,
  FaThLarge: <FaThLarge size={18} />,
  FaShieldAlt: <FaShieldAlt size={18} />,
};

const WhoWeServe = () => {
  return (
    <div className="bg-white py-8 lg:ml-7 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-full md:ml-4">
        <div className="flex flex-wrap gap-8 justify-start">
          {/* Three Category Sections */}
          {serviceData.map((section, index) => (
            <div key={index} className="flex mx-4 flex-col w-full sm:w-72 md:w-72">
              <div className="hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-md p-2 mb-4 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{iconMap[section.icon]}</span>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
              </div>

              {/* Reduced spacing here (was space-y-6) */}
              <div className="font-medium text-gray-700">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-orange-100 transition-colors duration-300 ease-in-out rounded-md p-2"
                  >
                    <div className="flex items-center">
                      <h4 className="text-gray-900 font-semibold">{item.name}</h4>
                      {item.badge && (
                        <span className="ml-2 bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-gray-500 text-sm mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Testimonial Section */}
          <div className="bg-blue-50 hover:bg-blue-100 transition-colors duration-200 ease-in-out rounded-lg p-6 w-full sm:w-72 md:w-72">
            <div className="mb-4">
              <img
                src="https://images.unsplash.com/photo-1584043720379-b56cd9199c94?w=600&auto=format&fit=crop&q=60"
                alt="CodeEternity testimonial"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl text-gray-700 font-bold mb-1">CodeEternity</h3>
              <h4 className="text-lg text-gray-600 font-medium mb-3">
              How CodeEternity Simplified Internship & Employee Development
              </h4>
              <div className="flex items-center">
                <span className="text-gray-600 font-medium">Learn more</span>
                <FaArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeServe;
