import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { X, Code, Check, ArrowRight, AlertCircle, Users, Clock, Award, Star, BookOpen, Download, Terminal, UserCheck, Layers, Zap, BarChart3, Smile, CalendarDays, Target } from 'lucide-react'; // Added more icons

const CourseDetailModal = ({ selectedChildCourse, setSelectedChildCourse }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  const handlePaymentClick = () => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    try {
      const encodedKey = encodeURIComponent(courseId);
      console.log('Encoded key:', encodedKey);
      navigate(`/payment/${encodedKey}`);
    } catch (error) {
      console.error('Error in handlePaymentClick:', error);
    }
  };

  useEffect(() => {
    if (!selectedChildCourse) {
      navigate('/whatweoffer');
      return;
    }

    const decodedCourseId = decodeURIComponent(courseId);

    if (decodedCourseId !== selectedChildCourse.key) {
      navigate('/whatweoffer');
    }
  }, [selectedChildCourse, courseId, navigate]);

  const handleClose = () => {
    setSelectedChildCourse(null);
    navigate('/whatweoffer');
  };

  if (!selectedChildCourse) {
    return null;
  }

  // Dummy data for new sections, replace with actual data if available
  const instructor = {
    name: selectedChildCourse.instructorName || "Alex Hartman",
    title: selectedChildCourse.instructorTitle || "Lead Full-Stack Developer & Mentor",
    bio: selectedChildCourse.instructorBio || "Alex has over 12 years of experience in the tech industry, specializing in scalable web applications and innovative UI/UX design. He's passionate about sharing knowledge and helping students achieve their career goals.",
    avatar: selectedChildCourse.instructorAvatar || "https://via.placeholder.com/100/8B5CF6/FFFFFF?Text=AH", // Placeholder
  };

  const whatYoullLearnItems = [
    { title: "Core Fundamentals", desc: "Master essential concepts and principles.", icon: <Target size={20} className="text-purple-500" /> },
    { title: "Practical Projects", desc: "Build 5+ portfolio-worthy projects.", icon: <Zap size={20} className="text-pink-500" /> },
    { title: "Industry Tools", desc: "Latest professional tools & technologies.", icon: <Terminal size={20} className="text-teal-500" /> },
    { title: "Best Practices", desc: "Industry-standard methodologies.", icon: <Award size={20} className="text-yellow-500" /> },
    { title: "Career Guidance", desc: "Job search & interview preparation.", icon: <Users size={20} className="text-green-500" /> },
    { title: "Certification", desc: "Industry-recognized certificate upon completion.", icon: <Star size={20} className="text-red-500" /> }
  ];
  
  const curriculumModules = [
    { module: "Foundations & Setup", week: "Week 1-2", desc: "Environment setup, core concepts, and your first dynamic application.", lessons: 12, icon: <Layers size={20} className="text-purple-600"/> },
    { module: "Components & State", week: "Week 3-4", desc: "Component lifecycle, state management, and props mastery in depth.", lessons: 15, icon: <BarChart3 size={20} className="text-pink-600"/> },
    { module: "Hooks & Context", week: "Week 5-7", desc: "Modern patterns with hooks, context API, and state handling.", lessons: 18, icon: <Zap size={20} className="text-teal-600"/> },
    { module: "Advanced Patterns & Deployment", week: "Week 8-10", desc: "Performance optimization, testing strategies, and deployment.", lessons: 20, icon: <Terminal size={20} className="text-indigo-600"/> }
  ];


  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 bg-slate-100 px-2 sm:px-4 md:p-4 flex items-center justify-center transition-opacity duration-500 ease-in-out">
      {/* Modal Container */}
      <div className="w-full max-w-7xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-black p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center text-white">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-6 shadow-lg">
                <Code size={24} sm:size={32} className="text-pink-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{selectedChildCourse.name}</h2>
                <p className="text-purple-300 text-xs sm:text-sm md:text-lg">{selectedChildCourse.category} • Premium Course</p>
                <div className="flex flex-wrap items-center mt-2 sm:mt-3 gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center bg-yellow-400/20 px-2 py-1 rounded-md">
                    <Star className="text-yellow-300 mr-1" size={12} sm:size={14} />
                    <span className="text-xs sm:text-sm text-yellow-200">{selectedChildCourse.rating || 4.9} ({selectedChildCourse.ratingCount || 12450} reviews)</span>
                  </div>
                  <div className="flex items-center bg-green-400/20 px-2 py-1 rounded-md">
                    <Users className="text-green-300 mr-1" size={12} sm:size={14} />
                    <span className="text-xs sm:text-sm text-green-200">{selectedChildCourse.students || 12450} students</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 sm:p-3 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:text-pink-300"
            >
              <X size={20} sm:size={24} md:size={28} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Course Overview Section */}
          <div className="mb-6 sm:mb-8 md:mb-10 bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-slate-200">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4 md:mb-6">Course Overview</h3>
            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {selectedChildCourse.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {[
                { title: "Comprehensive", desc: "Complete curriculum covering all aspects", icon: <BookOpen size={20} sm:size={24} className="text-purple-600"/> },
                { title: "Hands-on Projects", desc: "Learn by building real-world applications", icon: <Terminal size={20} sm:size={24} className="text-pink-600"/> },
                { title: "Expert-led", desc: "Taught by industry professionals", icon: <UserCheck size={20} sm:size={24} className="text-teal-600"/> }
              ].map(item => (
                <div key={item.title} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 flex items-start space-x-2 sm:space-x-3 group">
                  <div className="flex-shrink-0 bg-slate-100 p-2 sm:p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-slate-700 font-semibold text-base sm:text-lg mb-1 group-hover:text-purple-700">{item.title}</div>
                    <div className="text-slate-600 text-xs sm:text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Course Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
            {[
              { value: selectedChildCourse.duration, label: "Weeks", icon: <Clock size={24} sm:size={28} />, color: "purple" },
              { value: selectedChildCourse.level, label: "Level", icon: <Layers size={24} sm:size={28} />, color: "sky" },
              { value: "95%", label: "Success Rate", icon: <Award size={24} sm:size={28} />, color: "green" },
              { value: "24/7", label: "Support", icon: <Smile size={24} sm:size={28} />, color: "orange" },
              { value: "Free", label: "Resources", icon: <Download size={24} sm:size={28} />, color: "pink" }
            ].map(stat => (
              <div key={stat.label} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center shadow-lg hover:shadow-xl border border-${stat.color}-200 transition-all duration-300 transform hover:scale-105`}>
                <div className={`text-${stat.color}-600 mx-auto mb-2 sm:mb-3`}>{stat.icon}</div>
                <div className={`text-${stat.color}-700 font-bold text-lg sm:text-xl md:text-2xl`}>{stat.value}</div>
                <div className={`text-${stat.color}-800 text-xs sm:text-sm font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* What You'll Master */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6">What You'll Master</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                  {whatYoullLearnItems.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-lg hover:shadow-purple-200/50 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start">
                        <span className="mr-3 sm:mr-4 mt-1 bg-slate-100 p-2 rounded-lg">{item.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800 text-base sm:text-lg mb-1">{item.title}</div>
                          <div className="text-xs sm:text-sm text-slate-600">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/30 rounded-2xl sm:rounded-3xl -z-10"></div>
                
                <div className="relative p-4 sm:p-6 md:p-8">
                  <div className="text-center mb-6 sm:mb-10">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                      {selectedChildCourse.name} - Course Curriculum
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                      Comprehensive learning path designed to take you from beginner to expert
                    </p>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
                    {selectedChildCourse.curriculum.map((module, index) => (
                      <details 
                        key={index} 
                        className="group bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden hover:-translate-y-1"
                      >
                        <summary className="flex items-center justify-between p-4 sm:p-6 md:p-8 cursor-pointer list-none group-hover:bg-gradient-to-r group-hover:from-purple-50/80 group-hover:to-blue-50/80 transition-all duration-300">
                          <div className="flex items-center flex-1">
                            <div className="mr-4 sm:mr-6 p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl sm:rounded-2xl group-hover:from-purple-200 group-hover:to-blue-200 transition-all duration-300 shadow-lg group-hover:shadow-purple-200/70 group-hover:scale-110">
                              <div className="text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                                {module.icon}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                                <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold rounded-full shadow-md">
                                  {module.weeks}
                                </span>
                                <h4 className="font-bold text-slate-800 text-base sm:text-lg md:text-xl group-hover:text-purple-700 transition-colors duration-300">
                                  {module.module}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span className="text-xs sm:text-sm text-slate-600 group-hover:text-purple-600 font-medium transition-colors duration-300">
                                  {Array.isArray(module.description) ? module.description.length : 1} interactive lessons
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-3 sm:ml-4 p-2 rounded-full bg-slate-100/50 group-hover:bg-purple-100 transition-all duration-300">
                            <ArrowRight 
                              size={16} sm:size={20}
                              className="text-slate-500 group-hover:text-purple-600 group-open:rotate-90 transition-all duration-300" 
                            />
                          </div>
                        </summary>
                        
                        <div className="border-t border-gradient-to-r from-purple-200/30 to-blue-200/30 bg-gradient-to-br from-slate-50/80 to-purple-50/40 backdrop-blur-sm">
                          <div className="p-4 sm:p-6 md:p-8">
                            {Array.isArray(module.description) ? (
                              <div className="grid gap-3 sm:gap-4">
                                {module.description.map((item, i) => (
                                  <div 
                                    key={i} 
                                    className="group/item flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-purple-300/50 hover:bg-white/80 hover:shadow-md transition-all duration-300 hover:translate-x-2"
                                  >
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="relative">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover/item:shadow-purple-300/50 group-hover/item:scale-110 transition-all duration-300">
                                          <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                          </svg>
                                        </div>
                                        <div className="absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 bg-purple-400 rounded-full animate-ping opacity-20 group-hover/item:opacity-40"></div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex-1">
                                      <span className="text-slate-700 group-hover/item:text-slate-900 text-xs sm:text-sm md:text-base leading-relaxed font-medium transition-colors duration-300">
                                        {item}
                                      </span>
                                    </div>
                                    
                                    <div className="flex-shrink-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                                      <ArrowRight size={14} sm:size={16} className="text-purple-500" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/50">
                                <p className="text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed">{module.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                  
                  <div className="mt-6 sm:mt-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200/50">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-700 font-medium text-xs sm:text-sm">
                        Complete curriculum with hands-on projects and assessments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-8">
              {/* Prerequisites */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">Prerequisites</h3>
                <div className="bg-sky-50 border-2 border-sky-200 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <span className="bg-sky-100 p-2 sm:p-3 rounded-lg text-sky-600 mr-3 sm:mr-4 flex-shrink-0">
                      <AlertCircle size={20} sm:size={24} />
                    </span>
                    <div className="text-xs sm:text-sm md:text-base text-sky-800 font-medium">
                      {selectedChildCourse.prerequisites}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl text-white transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 mb-1">₹1,999</div>
                  <div className="text-slate-300 text-xs sm:text-sm">One-time payment</div>
                  <div className="text-slate-400 text-xs line-through">₹4,999 regular price</div>
                </div>
                <ul className="text-xs sm:text-sm space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {[
                    "Lifetime access to course content",
                    "1-on-1 mentorship sessions",
                    "Job placement assistance",
                    "30-day money-back guarantee",
                    "Exclusive community access"
                  ].map(benefit => (
                    <li key={benefit} className="flex items-center">
                      <Check size={16} sm:size={18} className="mr-2 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <button 
                    onClick={handlePaymentClick}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => navigate('/login', { state: { from: location } })}
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Login to Enroll
                    </button>
                    <button 
                      onClick={() => navigate('/signup', { state: { from: location } })}
                      className="block w-full text-center bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-6 sm:mt-10 md:mt-16 bg-gradient-to-r from-slate-50 to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-xl border border-slate-200">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-2 sm:mb-3">Ready to Elevate Your Skills?</h3>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">Join thousands of successful students who transformed their careers with our courses.</p>
            
            {user ? (
              // User is logged in - show enroll button
              <button 
                onClick={handlePaymentClick}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 sm:py-4 px-6 sm:px-10 md:px-12 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center mx-auto group transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                Enroll in {selectedChildCourse.name}
                <ArrowRight size={18} sm:size={22} className="ml-2 sm:ml-3 group-hover:translate-x-1.5 transition-transform" />
              </button>
            ) : (
              // User is not logged in - show login and signup options
              <div className="space-y-4 sm:space-y-6">
                <p className="text-slate-600 text-sm sm:text-base font-medium">Please login or create an account to enroll</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <button 
                    onClick={() => navigate('/login', { state: { from: location } })}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 px-6 sm:px-10 md:px-12 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center group transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                  >
                    Login to Enroll
                    <ArrowRight size={18} sm:size={22} className="ml-2 sm:ml-3 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <button 
                    onClick={() => navigate('/signup', { state: { from: location } })}
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 sm:py-4 px-6 sm:px-10 md:px-12 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center group transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
                    Create Account
                    <ArrowRight size={18} sm:size={22} className="ml-2 sm:ml-3 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            )}
            
            <p className="text-xs sm:text-sm text-slate-500 mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <span className="flex items-center"><CalendarDays size={14} sm:size={16} className="mr-1.5 text-purple-500"/>Next batch starts Monday!</span>
                <span className="flex items-center"><Users size={14} sm:size={16} className="mr-1.5 text-pink-500"/>Limited seats available.</span>
                <span className="flex items-center"><Award size={14} sm:size={16} className="mr-1.5 text-orange-500"/>30-day guarantee.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;