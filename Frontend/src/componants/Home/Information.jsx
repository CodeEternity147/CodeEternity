import React from 'react';

import {
  FaAward,
  FaChartBar,
  FaCheckCircle,
  FaUsers,
} from 'react-icons/fa';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className=" p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <div className="text-[#b7790e]   text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Information = () => {
  return (
    <section id="about" className="py-20  bg-[#fffbf4]  ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why CodeEternity Stands Out</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A technology startup focused on shaping the future of software development.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center mb-24 gap-10">
  <div className="lg:w-1/2 space-y-6">
    <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h3>
    <p className="text-gray-700 text-lg leading-relaxed">
      Founded in 2023, CodeEternity offers comprehensive IT services and unique internship opportunities to help businesses and individuals thrive in the digital world.
    </p>
    <p className="text-gray-700 text-lg leading-relaxed">
      Our team includes experts from top tech firms like EY, HCL, and BYJU'S. We combine mentorship, real-time training, and cutting-edge solutions to deliver excellence.
    </p>
    <button className="mt-4 inline-block bg-orange-400 text-white font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition hover:scale-105 duration-300">
      Know More
    </button>
  </div>

  <div className="lg:w-1/2 relative group rounded-lg overflow-hidden shadow-xl">
    <img
      src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
      alt="Our team"
      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition duration-300 rounded-lg" />
  </div>
</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<FaUsers />} 
            title="Expert Team"
            description="Seasoned professionals with deep industry knowledge and cutting-edge skills."
          />
          <FeatureCard 
            icon={<FaCheckCircle />} 
            title="Customized Solutions"
            description="Personalized services tailored to meet your specific business needs."
          />
          <FeatureCard 
            icon={<FaAward />} 
            title="Proven Track Record"
            description="Consistent delivery of results that drive efficiency and growth."
          />
          <FeatureCard 
            icon={<FaChartBar />} 
            title="Mentorship & Learning"
            description="Internship programs offering real-world projects and expert guidance."
          />
        </div>
      </div>
    </section>
  );
};

export default Information;
