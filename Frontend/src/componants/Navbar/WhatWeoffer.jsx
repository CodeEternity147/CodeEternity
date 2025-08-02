import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import data from '../../data/data';
import ImgCard from './ImgCard';
import * as FaIcons from 'react-icons/fa';
import RightCard from './RightCard';
import studentPrograms from '../../data/studentPrograms';
import placementPrograms from '../../data/placementPrograms';
import { X, ExternalLink, AlertCircle } from 'lucide-react';
import { ChevronRight, Star, Users, BookOpen, Award, ArrowRight, Check, Calendar, Clock, Play, Download, Target, Heart, Book, Briefcase, Zap, Globe, TrendingUp, Code } from 'lucide-react';

function WhatWeOffer({ selectedChildCourse, setSelectedChildCourse }) {
  const { whatWeOffer } = data;
  const [activeTab, setActiveTab] = useState('training');
  const [selectedItem, setSelectedItem] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('WhatWeOffer component mounted with props:', { selectedChildCourse, setSelectedChildCourse }); // Debug log
  }, [selectedChildCourse, setSelectedChildCourse]);

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

  const handleCourseClick = (course, category) => {
    // console.log('Course clicked:', course); // Debug log
    if (typeof setSelectedChildCourse !== 'function') {
      console.error('setSelectedChildCourse is not a function:', setSelectedChildCourse); // Debug log
      return;
    }
    
    const courseWithCategory = { 
      ...course, 
      category,
      key: course.key || `${category}_${course.index}` // Ensure key exists
    };
    // console.log('Course with category:', courseWithCategory); // Debug log
    
    try {
      // First set the selected course
      setSelectedChildCourse(courseWithCategory);
      
      // Encode the course key to handle special characters in the URL
      const encodedKey = encodeURIComponent(courseWithCategory.key);
      // console.log('Encoded key:', encodedKey); // Debug log
      
      // Then navigate to the course detail page with encoded key
      navigate(`/course/${encodedKey}`);
    } catch (error) {
      console.error('Error in handleCourseClick:', error); // Debug log
    }
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
                      <button 
                        className="w-full bg-white text-purple-900 py-3 px-4 rounded-xl font-medium flex items-center justify-center group transition-all duration-300 hover:bg-purple-50"
                        onClick={() => navigate('/contactCodeEternity')}
                      >
                        Schedule Call
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-12 lg:col-span-6  order-1 lg:order-2">
                <div className="bg-white  rounded-3xl shadow-xl overflow-hidden">
                  <div className="p-8">
                  


                    {/* Combined Courses & Target Audience */}
                    <div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl px-5 py-4 border border-blue-200 shadow-sm mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                              <Users size={20} className="text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">Available Programs - {whatWeOffer[selectedItem]?.name}</h3>
                              <p className="text-blue-600 text-sm">Perfect for your career path</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-700">{whatWeOffer[selectedItem]?.childCourses?.length || 0}</div>
                            <div className="text-blue-600 text-xs">Courses</div>
                          </div>
                        </div>
                        
                        {whatWeOffer[selectedItem] && whatWeOffer[selectedItem].targetAudience && (
                          <div className="bg-white/60 rounded-xl p-4 mb-4 border border-blue-200">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                              <span className="text-sm font-semibold text-blue-700">Suitable For</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {whatWeOffer[selectedItem].targetAudience.split(', ').map((degree, index) => (
                                <span 
                                  key={index}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition-all duration-200 border border-blue-200"
                                >
                                  {degree.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        {whatWeOffer[selectedItem] && whatWeOffer[selectedItem].childCourses && whatWeOffer[selectedItem].childCourses.map((course, index) => {
                            const Icon = FaIcons[course.reactIcon];
                            const bgColor = whatWeOffer[selectedItem].iconBgColor;

                          return (
                            
                             <div key={index} className=" shadow-sm rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
                              
                              
                            <div className="flex items-center">
                              
                              <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                
                                 <div
                      className="p-2 rounded-md text-black text-sm"
                      style={{ backgroundColor: bgColor }}
                    >
                      {Icon && <Icon />}
                    </div>
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{course.name}</div>
                                <div className="text-sm text-gray-600">{course.description ? course.description.substring(0, 80) + '...' : 'Comprehensive training program'}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                // console.log('Button clicked for course:', course); // Debug log
                                handleCourseClick(course, whatWeOffer[selectedItem].name);
                              }}
                              className="bg-purple-600 flex items-center cursor-pointer text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                              style={{ backgroundColor: bgColor }}
                            >
                              View Details
                              <ExternalLink size={20} className="ml-2" />
                            </button>
                        </div>
                          )
                        })}
                      </div>
                    </div>

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


                            <span className="text-xs text-gray-500 ml-2">1000+ students</span>
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
                        src={program.sideImg}
                        alt={program.sideImgAlt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-medium">
                          <Clock size={14} className="mr-1" />
                          {program.duration} Weeks
                        </div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < Math.round(program.rating) ? "currentColor" : "none"} stroke={i < Math.round(program.rating) ? "none" : "currentColor"} />
                          ))}
                          <span className="ml-1 text-gray-600 text-xs">{program.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-gray-800">{program.name}</h3>
                      <p className="text-gray-600 mb-5">{program.description}</p>

                      <div className="space-y-3 mb-6">
                        {program.skills.slice(0, expandedPrograms[index] ? program.skills.length : 3).map((feature, idx) => (
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

                        <button
                          className="w-full bg-emerald-50 text-emerald-700 border border-emerald-100 py-3 px-4 rounded-xl font-medium flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300"
                          onClick={() => navigate(`/placement-program/${encodeURIComponent(program.key)}`)}
                        >
                          View Details
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
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                         {/* Premium Hero Section with Luxury Color Scheme */}
             <div className="relative mb-8 sm:mb-12 lg:mb-20 overflow-hidden border-2 border-emerald-400/30 rounded-xl sm:rounded-2xl lg:rounded-3xl">
               <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 animate-gradient-xy"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-blue-400/20"></div>
               <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative container mx-auto px-3 sm:px-4 md:px-6 py-12 sm:py-16 lg:py-20">
                <div className="text-center max-w-4xl mx-auto">
                  <div className="inline-flex items-center bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 backdrop-blur-md text-emerald-300 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold mb-6 sm:mb-8 lg:mb-10 border border-emerald-400/30 animate-pulse shadow-lg">
                    <Zap size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 animate-bounce text-cyan-300" />
                    <span className="text-xs sm:text-sm lg:text-base">PREMIUM PERSONAL DEVELOPMENT</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white mb-4 sm:mb-6 lg:mb-8 leading-tight animate-fade-in-up">
                    Elevate Your
                    <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent animate-text-shimmer">
                      Professional Presence
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light px-2">
                    Master the art of communication, leadership, and personal branding with our exclusive premium programs
                  </p>
                </div>
              </div>
              
                             {/* Premium Floating Elements */}
        
            </div>

            {/* Premium Programs Section */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 mb-12 sm:mb-16 lg:mb-20">
              <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                <span className="inline-flex items-center bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold mb-6 sm:mb-8 shadow-lg border border-slate-200">
                  <Star size={16} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 text-emerald-500" />
                  <span className="text-xs sm:text-sm lg:text-base">EXCLUSIVE PREMIUM PROGRAMS</span>
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-800 mb-4 sm:mb-6 lg:mb-8">
                  Transform Your
                  <span className="block bg-gradient-to-r from-slate-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                    Professional Identity
                  </span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light px-2">
                  Our meticulously crafted premium programs are designed to elevate your soft skills and create lasting professional impact
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {studentPrograms.map((program, index) => (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-xl sm:rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden h-full transform transition-all duration-700 group-hover:-translate-y-4 sm:group-hover:-translate-y-6 group-hover:shadow-3xl border border-slate-200">
                                             {/* Premium Program Header */}
                       <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                         <div 
                           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                           style={{ backgroundImage: `url(${program.image})` }}
                         ></div>
                                                  <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8">
                            <div className="bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 backdrop-blur-md text-emerald-300 px-3 sm:px-4 lg:px-6 py-2 sm:py-2 lg:py-3 rounded-lg sm:rounded-xl text-xs font-bold border border-emerald-400/30 shadow-lg">
                             <span className="text-xs sm:text-sm">{index === 0 ? 'BEST SELLER' : index === 1 ? 'PREMIUM' : 'ELITE'}</span>
                           </div>
                         </div>
                       </div>

                                             {/* Premium Program Content */}
                       <div className="p-4 sm:p-6 lg:p-10">
                         <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 mb-2 sm:mb-3">{program.title}</h3>
                         <div className="flex items-center text-slate-600 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                           <Clock size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                           {index === 0 ? '12 weeks' : index === 1 ? '8 weeks' : '16 weeks'}
                           <span className="mx-2 sm:mx-3 lg:mx-4">•</span>
                           <Users size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2" />
                           {index === 0 ? '40 students' : index === 1 ? '25 students' : '35 students'}
                         </div>
                         <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg font-light">{program.description}</p>

                        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                          {program.features.slice(0, expandedPrograms[index] ? program.features.length : 3).map((feature, idx) => (
                            <div key={idx} className="flex items-start text-slate-700 group/feature">
                              <div className="mt-1 bg-gradient-to-r from-emerald-100 to-cyan-100 text-emerald-600 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4 group-hover/feature:scale-110 transition-transform shadow-sm">
                                <Check size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                              </div>
                              <span className="text-sm sm:text-base font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>

                                                {/* Expandable Features */}
                        {program.features.length > 3 && (
                          <div 
                            onClick={() => toggleFeatures(index)}
                            className="text-emerald-600 font-bold text-sm sm:text-base mb-6 sm:mb-8 flex items-center cursor-pointer hover:text-emerald-700 transition-colors group/expand"
                          >
                            {expandedPrograms[index] ? 'Show Less' : `+${program.features.length - 3} more skills`}
                                                         <ChevronRight 
                               size={16}
                               className={`sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 transition-transform duration-300 group-hover/expand:translate-x-1 ${expandedPrograms[index] ? 'rotate-90' : ''}`}
                             />
                          </div>
                        )}

                        {/* Premium Program Footer */}
                        <div className="border-t border-slate-200 pt-6 sm:pt-8">
                          <div className="flex justify-between items-center mb-4 sm:mb-6">
                            <div className="text-slate-500 text-xs sm:text-sm font-medium">Program Level</div>
                            <div className="text-emerald-600 font-bold text-sm sm:text-base lg:text-lg">{index === 0 ? 'Foundation' : index === 1 ? 'Advanced' : 'Mastery'}</div>
                          </div>
                                                      <button className="w-full bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-800 text-white py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-xl hover:from-slate-900 hover:via-purple-900 hover:to-indigo-900 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl group/btn shadow-lg">
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform" className="flex items-center justify-center">
                              Enroll Now
                              <ArrowRight size={18} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6 ml-2 sm:ml-3 group-hover/btn:translate-x-2 transition-transform" />
                            </a>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Call to Action Section */}
            <div className="container mx-auto px-3 sm:px-4 md:px-6 mb-12 sm:mb-16 lg:mb-20">
              <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 rounded-xl sm:rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden border-2 border-emerald-400/30">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-blue-400/10"></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 sm:mb-8">
                    Ready to Elevate Your Professional Journey?
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light px-2">
                    Join an exclusive community of professionals who have transformed their careers with our premium soft skills programs
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                                         <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 sm:py-4 lg:py-5 px-6 sm:px-8 lg:px-10 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base lg:text-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-500 transform hover:scale-110 shadow-2xl">
                      <a href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform">
                        Start Your Transformation
                      </a>
                    </button>
                  </div>
                </div>
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
  <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl flex flex-wrap sm:flex-nowrap justify-between gap-1 sm:gap-4 border border-indigo-100">
    {tabs.map((tab, index) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`
          ${index === 2 ? 'w-1/2 mx-auto mt-2 sm:mt-0 sm:mx-0 sm:w-auto sm:flex-1' : 'w-[48%] sm:w-auto sm:flex-1'}
          text-[10px] sm:text-sm md:text-base lg:text-lg font-medium py-3 sm:py-4 px-2 sm:px-2 md:px-6 
          rounded-xl transition-all duration-500 flex items-center justify-center 
          space-x-2 sm:space-x-1 overflow-hidden relative group
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

export default WhatWeOffer;