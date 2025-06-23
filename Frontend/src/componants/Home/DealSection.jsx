import React from 'react';
import img2 from '../../assets/img2.svg'; // Adjust the path as necessary

const DealSection = () => {
  return (
    <>
    <img 
      src={img2} 
      alt="Footer Background" 
      className="w-full bg-[#fffbf4] h-auto object-cover "
    />
    
    <div className="bg-[#ffe27c] text-center py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#141414] mb-4 md:mb-6">
        "Empowering tech talent and businesses with real-world experience and cutting-edge solutions."
        </h2>
        <div className="flex flex-wrap justify-center gap-28 mb-8 md:mb-12">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-semibold text-[#141414]">5+</span>
            <span className="text-sm md:text-base text-gray-700 ">countries</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-semibold text-[#141414]">200+</span>
            <span className="text-sm md:text-base text-gray-700">learners & clients served</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-semibold text-[#141414]">25+</span>
            <span className="text-sm md:text-base text-gray-700">expert mentors and developers</span>
          </div>
        </div>
   
      </div>
    </div>
          </>
  );
};

export default DealSection;
