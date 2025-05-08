import React from 'react';
import data from '../../data/data'; // Adjust the path as necessary

const WhatWeOffer = () => {
  return (
    <div className="bg-white py-8 lg:ml-7 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-full md:ml-4">
        <div className="flex flex-wrap gap-8 justify-start">
          {data.map((section, index) => (
            <div key={index} className="flex mx-4 flex-col w-full sm:w-72 md:w-72">
              <div className="hover:bg-blue-100 transition-colors duration-300 ease-in-out rounded-md p-2 mb-4 pb-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{section.icon}</span>
                  <h3 className="text-xl font-semibold">{section.name}</h3>
                </div>
              </div>
              <div className="font-medium text-gray-700">
                {section.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="hover:bg-orange-100 transition-colors duration-300 ease-in-out rounded-md p-2"
                  >
                    <div className="flex items-center">
                      <h4 className="text-gray-900 font-semibold">{course.name}</h4>
                    </div>
                    {course.description && (
                      <p className="text-gray-500 text-sm mt-0.5">
                        {course.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
