import React, { useState, useEffect } from 'react';
import { BsGrid3X3Gap } from 'react-icons/bs';
import Logo from '../../assets/Logo.png';
import {
  FaArrowRight,
  FaBuilding,
  FaShieldAlt,
  FaThLarge,
  FaUsers,
  FaStar,
  FaQuoteRight,
  FaLightbulb,
  FaRocket,
  FaGem
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';


import { serviceData } from '../../data/serviceData.js';

const iconMap = {
  FaUsers: <FaUsers size={28} className="text-indigo-500" />,
  FaBuilding: <FaBuilding size={28} className="text-emerald-500" />,
  BsGrid3X3Gap: <BsGrid3X3Gap size={28} className="text-pink-500" />,
  FaThLarge: <FaThLarge size={28} className="text-amber-500" />,
  FaShieldAlt: <FaShieldAlt size={28} className="text-purple-500" />,
};

const WhoWeServe = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Automatically rotate through tabs
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % serviceData.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const tabColors = [
    "from-indigo-600 to-blue-500",
    "from-emerald-600 to-green-500",
    "from-pink-600 to-rose-500",
    "from-amber-600 to-yellow-500",
    "from-purple-600 to-violet-500"
  ];
  
  const tabIconBgColors = [
    "bg-indigo-100",
    "bg-emerald-100",
    "bg-pink-100",
    "bg-amber-100",
    "bg-purple-100"
  ];

  return (
    <div className="py-20 font-sans">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 max-w-7xl"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-3">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full">
              Tailored Solutions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Who We Serve
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We provide specialized solutions designed to meet the unique needs of your industry.
            Discover how we can help transform your business.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap justify-center mb-12 gap-3"
        >
          {serviceData.map((section, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 shadow-md ${
                activeTab === index
                  ? `bg-gradient-to-r ${tabColors[index % tabColors.length]} text-white`
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-transparent hover:shadow-lg'
              }`}
            >
              <span>{iconMap[section.icon]}</span>
              <span className="text-base">{section.title}</span>
              {activeTab === index && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="ml-1 h-2 w-2 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Active Tab Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-100">
              <div className={`p-4 rounded-xl ${tabIconBgColors[activeTab % tabIconBgColors.length]}`}>
                {iconMap[serviceData[activeTab].icon]}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
                {serviceData[activeTab].title}
              </h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {serviceData[activeTab].items.map((item, idx) => {
                  // Create unique color variations for each card
                  const colorVariants = [
                    "from-indigo-500 to-blue-600",
                    "from-purple-500 to-violet-600", 
                    "from-pink-500 to-rose-600",
                    "from-amber-500 to-orange-600",
                    "from-emerald-500 to-green-600",
                    "from-cyan-500 to-blue-600",
                  ];
                  
                  const colorVar = colorVariants[idx % colorVariants.length];
                  const isHovered = hoveredItem === `${activeTab}-${idx}`;
                  
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03, y: -5 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.1 * idx }
                      }}
                      className={`rounded-xl transition-all duration-300 shadow-lg overflow-hidden group relative`}
                      style={{ 
                        background: 'radial-gradient(circle at 10% 20%, rgb(255, 255, 255) 0%, rgb(246, 248, 255) 90.1%)' 
                      }}
                      onMouseEnter={() => setHoveredItem(`${activeTab}-${idx}`)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      {/* Top colored border with dynamic width on hover */}
                      <motion.div 
                        className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${colorVar}`}
                        animate={{ width: isHovered ? '100%' : '30%' }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                        <div className={`absolute transform rotate-45 translate-x-8 -translate-y-5 w-16 h-8 bg-gradient-to-r ${colorVar}`}></div>
                      </div>
                      
                      {/* Glowing circle background on hover */}
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.07, scale: 1 }}
                          className={`absolute right-0 bottom-0 w-32 h-32 rounded-full bg-gradient-to-r ${colorVar}`}
                          style={{ filter: 'blur(20px)' }}
                        />
                      )}
                      
                      <div className="p-6 relative z-10">
                        {/* Icon pattern */}
                        <div className="absolute top-3 right-3 opacity-5 text-gray-900">
                          {idx % 2 === 0 ? 
                            <FaGem size={52} className="transform rotate-12" /> : 
                            <FaRocket size={52} className="transform -rotate-12" />
                          }
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          {/* Colored icon indicator */}
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${colorVar} shadow-md flex items-center justify-center`}>
                            {idx % 5 === 0 ? <FaGem size={14} className="text-white" /> :
                             idx % 5 === 1 ? <FaRocket size={14} className="text-white" /> :
                             idx % 5 === 2 ? <FaShieldAlt size={14} className="text-white" /> :
                             idx % 5 === 3 ? <FaLightbulb size={14} className="text-white" /> :
                             <FaThLarge size={14} className="text-white" />}
                          </div>
                          
                          <div className="flex items-center justify-between flex-1">
                            <h4 className="text-xl font-extrabold text-gray-800 tracking-tight">{item.name}</h4>
                            {item.badge && (
                              <span className={`bg-gradient-to-r ${colorVar} text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm ml-2`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Animated underline */}
                        <motion.div 
                          className="h-0.5 bg-gray-200 mb-4 w-full"
                          animate={{
                            background: isHovered ? 
                              ['linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 100%)', `linear-gradient(90deg, rgb(99, 102, 241) 0%, rgb(168, 85, 247) 100%)`] : 
                              'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 100%)'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {item.description && (
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        )}
                        
                        <motion.div 
                          className={`mt-5 font-medium flex items-center justify-between group cursor-pointer`}
                        >
                          <motion.span 
                            className={`flex items-center text-sm transition-colors duration-300`}
                            style={{
                              color: isHovered ? 
                                idx % 2 === 0 ? 'rgb(79, 70, 229)' : 'rgb(147, 51, 234)' : 
                                'rgb(107, 114, 128)'
                            }}
                            whileHover={{ x: 5 }}
                          >
                            Learn more 
                            <FaArrowRight className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                          </motion.span>
                          
                          {/* Added dot indicators */}
                          <div className="flex gap-1">
                            <motion.span 
                              className={`h-2 w-2 rounded-full bg-gray-300`}
                              animate={{ 
                                backgroundColor: isHovered ? 
                                  ['rgb(209, 213, 219)', idx % 2 === 0 ? 'rgb(79, 70, 229)' : 'rgb(147, 51, 234)'] : 
                                  'rgb(209, 213, 219)'
                              }}
                            />
                            <motion.span 
                              className="h-2 w-2 rounded-full bg-gray-200"
                              animate={{ 
                                backgroundColor: isHovered ? 
                                  ['rgb(229, 231, 235)', idx % 2 === 0 ? 'rgb(129, 140, 248)' : 'rgb(192, 132, 252)'] : 
                                  'rgb(229, 231, 235)'
                              }}
                              transition={{ delay: 0.1 }}
                            />
                            <motion.span 
                              className="h-2 w-2 rounded-full bg-gray-100"
                              animate={{ 
                                backgroundColor: isHovered ? 
                                  ['rgb(243, 244, 246)', idx % 2 === 0 ? 'rgb(165, 180, 252)' : 'rgb(216, 180, 254)'] : 
                                  'rgb(243, 244, 246)'
                              }}
                              transition={{ delay: 0.2 }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Testimonial and CTA Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            {/* Testimonial Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 text-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
            >
              {/* Animated background shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <motion.div 
                  animate={{ 
                    rotate: 360, 
                    scale: [1, 1.2, 1],
                    x: [0, 10, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="absolute top-4 right-4 w-40 h-40 rounded-full bg-white"
                />
                <motion.div 
                  animate={{ 
                    rotate: -360, 
                    scale: [1, 1.3, 1],
                    x: [0, -20, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                  className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-pink-400"
                />
              </div>
              
              <div className="relative z-10 mb-6">
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={Logo}
                      alt="Client"
                      className="rounded-full "
                    />
                    <div className="absolute -right-1 -bottom-1 bg-green-400 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      <FaGem size={10} className="text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex text-yellow-300 mt-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <p className="text-indigo-100 italic relative z-10 text-lg">
                  "Working with this team transformed our entire approach to employee development. 
                  Their solutions made our onboarding process seamless and effective."
                </p>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-indigo-700 hover:bg-indigo-50 transition-colors duration-300 py-3 px-6 rounded-xl font-medium flex items-center justify-center w-full shadow-md"
              >
                Read Case Study <FaArrowRight className="ml-2" />
              </motion.button>
            </motion.div>

            {/* Featured Content Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1733306490808-9c2ec551cbf4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="CodeEternity success story"
                  className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-medium mb-1">
                      <FaRocket className="text-amber-400" />
                      <span>SUCCESS STORY</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  How CodeEternity Simplified Internship & Employee Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how our comprehensive solution helped CodeEternity streamline their processes and improve team performance.
                </p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium flex items-center group"
                >
                  Read more <FaArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-10 shadow-xl border border-indigo-100 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div 
              animate={{ 
                x: [0, 15, 0], 
                y: [0, -10, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "mirror" 
              }}
              className="absolute top-10 left-10 w-32 h-32 rounded-full bg-indigo-200 blur-2xl"
            />
            <motion.div 
              animate={{ 
                x: [0, -15, 0], 
                y: [0, 10, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "mirror" 
              }}
              className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-purple-200 blur-3xl"
            />
          </div>
          
          <div className="relative z-10">
            <div className="mb-2 flex justify-center">
              <FaLightbulb size={28} className="text-indigo-500" />
            </div>
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">Ready to transform your business?</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Connect with our expert team to discover how our solutions can be tailored to your specific industry needs.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-4 px-10 rounded-xl transition-all duration-300 shadow-lg inline-flex items-center gap-2"
            >
              Schedule a Consultation
              <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhoWeServe;