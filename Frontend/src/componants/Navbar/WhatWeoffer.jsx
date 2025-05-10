import React, { useState, useEffect } from 'react';
import data from '../../data/data';
import ImgCard from './ImgCard';
import RightCard from './RightCard';
import studentPrograms from '../../data/studentPrograms';
import placementPrograms from '../../data/placementPrograms';
import { ChevronRight, Star, Users, BookOpen, Award, ArrowRight, Check, Calendar, Clock, Target, Heart, Book, Briefcase, Zap, Globe, TrendingUp } from 'lucide-react';

function WhatWeOfferContent() {
  const { whatWeOffer } = data;
  const [activeTab, setActiveTab] = useState('training');
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = [
    { id: 'training', label: 'Training & Internship', icon: <BookOpen size={18} /> },
    { id: 'placement', label: 'Placement Programs', icon: <Briefcase size={18} /> },
    { id: 'career', label: 'Career Development', icon: <TrendingUp size={18} /> }
  ];

  const toggleFeatures = (programIndex) => {
    setExpandedPrograms(prev => ({
      ...prev,
      [programIndex]: !prev[programIndex]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'training':
        return (
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">SKILLS DEVELOPMENT</span>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mt-4 mb-3">Training & Internship Programs</h2>
              <p className="text-gray-600">Accelerate your career with our industry-leading training and gain real-world experience through our internship partnerships</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Navigation Panel - Mobile Dropdown/Desktop Sidebar */}
              <div className="col-span-12 lg:col-span-3 order-1">

                <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-3xl shadow-xl overflow-hidden sticky top-8">
                  <div className="p-6">
                    <h3 className="text-white text-xl font-bold mb-6 flex items-center">
                      <span className="bg-white/20 p-2 rounded-lg mr-3">
                        <BookOpen size={18} className="text-purple-200" />
                      </span>
                      Program Selection
                    </h3>
                    <div className="space-y-3">
                      {whatWeOffer.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedItem(item.index)}
                          className={`cursor-pointer p-4 rounded-xl transition-all duration-300 flex items-center group ${selectedItem === item.index
                              ? 'bg-white text-purple-900 shadow-lg'
                              : 'text-white/80 hover:bg-white/10'
                            }`}
                        >
                          {selectedItem === item.index ? (
                            <span className="h-2 w-2 bg-purple-600 rounded-full mr-3"></span>
                          ) : (
                            <span className="h-2 w-2 bg-white/30 rounded-full mr-3 group-hover:bg-white/60"></span>
                          )}
                          <span className="font-medium">{item.name}</span>
                          {selectedItem === item.index && (
                            <ChevronRight size={16} className="ml-auto text-purple-600" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 bg-white/10 rounded-xl p-5 backdrop-blur-sm">
                      <h4 className="text-white text-sm font-medium mb-3">Need Guidance?</h4>
                      <p className="text-purple-100 text-xs mb-4">Connect with our career advisors for personalized recommendations</p>
                      <button className="w-full bg-white text-purple-900 py-3 px-4 rounded-xl font-medium flex items-center justify-center group transition-all duration-300 hover:bg-purple-50">
                        Schedule Call
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <span className="text-purple-600">
                          {selectedItem === 0 ? <BookOpen size={20} /> :
                            selectedItem === 1 ? <Target size={20} /> :
                              selectedItem === 2 ? <Users size={20} /> : <Award size={20} />}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold ml-4 text-gray-800">
                        {whatWeOffer[selectedItem] ? whatWeOffer[selectedItem].name : "Program Details"}
                      </h2>
                    </div>

                    <RightCard index={selectedItem} />

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg text-purple-600 mr-3">
                          <Calendar size={18} />
                        </span>
                        <div>
                          <div className="text-xs text-gray-500">Duration</div>
                          <div className="font-medium text-gray-800">12 Weeks</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg text-purple-600 mr-3">
                          <Clock size={18} />
                        </span>
                        <div>
                          <div className="text-xs text-gray-500">Time Commitment</div>
                          <div className="font-medium text-gray-800">20 hrs/week</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-8 pb-8">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-purple-600 font-bold text-2xl">97%</div>
                        <div className="text-purple-700 text-xs">Placement Rate</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-purple-600 font-bold text-2xl">40+</div>
                        <div className="text-purple-700 text-xs">Industry Partners</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <div className="text-purple-600 font-bold text-2xl">12k+</div>
                        <div className="text-purple-700 text-xs">Alumni Network</div>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-medium flex items-center justify-center group transition-all duration-300 hover:shadow-lg">
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform">
                      Apply for this Program
                      </a>
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Visual/Image Area */}
              <div className="col-span-12 lg:col-span-3 order-3">
                <div className="sticky top-8">
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-1">
                      <ImgCard index={selectedItem} />
                    </div>

                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-500">Success Rate</span>
                          <span className="text-xs font-medium text-purple-700">97%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: "97%" }}></div>
                        </div>
                      </div>

                      <h3 className="text-sm font-medium text-gray-700 mb-3">Program Highlights</h3>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="bg-purple-100 p-1 rounded text-purple-600 mr-2">
                            <Check size={12} />
                          </span>
                          <span className="text-xs text-gray-600">Industry recognized certification</span>
                        </div>
                        <div className="flex items-start">
                          <span className="bg-purple-100 p-1 rounded text-purple-600 mr-2">
                            <Check size={12} />
                          </span>
                          <span className="text-xs text-gray-600">Live mentoring sessions</span>
                        </div>
                        <div className="flex items-start">
                          <span className="bg-purple-100 p-1 rounded text-purple-600 mr-2">
                            <Check size={12} />
                          </span>
                          <span className="text-xs text-gray-600">Career support for 1 year</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <div className="flex -space-x-2">
  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
  <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Student" className="w-8 h-8 rounded-full border-2 border-white" />
</div>

                            <span className="text-xs text-gray-500 ml-2">+2.4k students</span>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700">
                            <Heart size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'placement':
        return (
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">CAREER LAUNCH</span>
              <h2 className="text-4xl font-bold mt-4 mb-3 text-emerald-800">Placement Guarantee Programs</h2>
              <p className="text-gray-600">Start your professional journey with confidence. Our placement programs ensure you land your dream job.</p>
            </div>


            {/* Other Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {placementPrograms.map((program, index) => (
                <div
                  key={index}
                  className="group"
                >
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="h-56 overflow-hidden relative">
                      <div className="absolute top-4 right-4 bg-white text-emerald-700 px-4 py-2 rounded-full text-sm font-medium z-10 shadow-md">
                        {index === 0 ? 'TRENDING' : index === 1 ? 'NEW BATCH' : 'HIGH DEMAND'}
                      </div>

                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-medium">
                          <Clock size={14} className="mr-1" />
                          {index === 0 ? '16 Weeks' : index === 1 ? '12 Weeks' : '24 Weeks'}
                        </div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} stroke={i < 4 ? "none" : "currentColor"} />
                          ))}
                          <span className="ml-1 text-gray-600 text-xs">4.0</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-800">{program.title}</h3>
                      <p className="text-gray-600 mb-5">{program.description}</p>

                      <div className="space-y-3 mb-6">
                        {program.features.slice(0, expandedPrograms[index] ? program.features.length : 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start text-gray-700">
                            <div className="mt-1 bg-emerald-100 text-emerald-600 p-1 rounded-full mr-3">
                              <Check size={12} />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-5 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-gray-500 text-sm">Avg. Salary</div>
                          <div className="text-emerald-700 font-bold">₹{6 + index * 2}L - ₹{10 + index * 3}L</div>
                        </div>

                        <button className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 py-3 px-4 rounded-xl font-medium flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform">
                          Apply Now
                          </a>
                          
                          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>



          </div>
        );

      case 'career':
        return (
          <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mb-24">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-500 skew-y-3 transform origin-top-left rounded-3xl -z-10"></div>
              <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <span className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                      <Globe size={16} className="mr-2" />
                      FUTURE LEADERS
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Shape Your Future <br />Starting Today</h2>
                    <p className="text-blue-100 text-lg mb-8">Comprehensive development programs designed for students in classes 6-12 to discover their potential and build skills for tomorrow.</p>
                    <button className="bg-white text-blue-900 py-4 px-8 rounded-xl font-medium hover:bg-blue-50 transition-colors">
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform">
                      Start Your Journey
                      </a>
                    </button>
                  </div>
                  <div className="relative">
                    <div className="bg-white p-1 rounded-3xl shadow-2xl rotate-3 transform">
                      <img src="/api/placeholder/600/400" alt="Students" className="rounded-2xl" />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center">
                        <div className="bg-white p-2 rounded-lg">
                          <Users size={24} className="text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-blue-100">Our Community</div>
                          <div className="font-medium text-white">50,000+ Students</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Programs */}
            <div className="container mx-auto px-6 mb-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
                <div>
                  <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">SPECIALIZED PROGRAMS</span>
                  <h2 className="text-3xl font-bold text-gray-800 mt-4 mb-2">Featured Student Programs</h2>
                  <p className="text-gray-600 max-w-xl">Our most popular and effective programs designed to give students a competitive edge</p>
                </div>
                <button className="mt-4 md:mt-0 flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  View All Programs
                  <ArrowRight size={18} className="ml-1" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studentPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-xl font-bold text-white">{program.title}</h3>
                        <div className="flex items-center text-xs text-white/80 mt-1">
                          <Clock size={14} className="mr-1" />
                          {index === 0 ? '12 weeks' : index === 1 ? '8 weeks' : '16 weeks'}
                          <span className="mx-2">•</span>
                          <Users size={14} className="mr-1" />
                          {index === 0 ? '40 students' : index === 1 ? '25 students' : '35 students'}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 mb-6 text-sm">{program.description}</p>

                      <div className="space-y-2 mb-6">
                        {program.features.slice(0, expandedPrograms[index] ? program.features.length : 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start text-gray-700">
                            <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                              <Check size={12} />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center">
                          {program.features.length > 3 && (
                            <div 
                              onClick={() => toggleFeatures(index)}
                              className="text-blue-600 font-medium text-sm mt-2 flex items-center cursor-pointer hover:text-blue-800 transition-colors"
                            >
                              {expandedPrograms[index] ? 'Show Less' : `+${program.features.length - 3} more features`}
                              <ChevronRight 
                                size={16} 
                                className={`ml-1 transition-transform duration-300 ${expandedPrograms[index] ? 'rotate-90' : ''}`}
                              />
                            </div>
                          )}
                          <button className="bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform">
                            Apply Now
                          </a>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-36 ">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">Transform Your Future</h1>
          <p className="text-xl text-gray-600">Discover programs designed to accelerate your growth and set you on the path to success</p>
        </div>
      </div>

  {/* Tabs Section */}
<div className="w-[95%] sm:w-[90%] md:w-[85%] lg:max-w-4xl mx-auto px-2 sm:px-4 mb-8 sm:mb-12">
  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl flex flex-wrap sm:flex-nowrap justify-between gap-3 sm:gap-4 border border-indigo-100">
    {tabs.map((tab, index) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`
          ${index === 2 ? 'w-1/2 mx-auto mt-2 sm:mt-0 sm:mx-0 sm:w-auto sm:flex-1' : 'w-[48%] sm:w-auto sm:flex-1'}
          text-xs sm:text-sm md:text-base lg:text-lg font-medium py-3 sm:py-4 px-2 sm:px-4 md:px-6 
          rounded-xl transition-all duration-500 flex items-center justify-center 
          space-x-2 sm:space-x-3 overflow-hidden relative group
          ${
            activeTab === tab.id
              ? tab.id === 'training'
                ? 'bg-gradient-to-r from-purple-900 to-blue-800 text-white shadow-lg'
                : tab.id === 'placement'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-lg'
              : 'bg-white/90 text-gray-700 hover:shadow-md hover:translate-y-1 hover:bg-white'
          }
        `}
      >
        {activeTab === tab.id && (
          <span className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        )}
        <span className={`text-base sm:text-lg md:text-xl relative z-10 transition-transform duration-300 group-hover:scale-110 ${
          activeTab === tab.id
            ? 'text-white'
            : tab.id === 'training'
              ? 'text-blue-500 group-hover:text-blue-600'
              : tab.id === 'placement'
                ? 'text-emerald-500 group-hover:text-emerald-600'
                : 'text-purple-500 group-hover:text-purple-600'
        }`}>{tab.icon}</span>
        <span className={`whitespace-nowrap font-semibold relative z-10 transition-all duration-300 group-hover:font-bold ${
          activeTab === tab.id ? 'text-white' : 'text-gray-800'
        }`}>{tab.label}</span>
      </button>
    ))}
  </div>
</div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default WhatWeOfferContent;