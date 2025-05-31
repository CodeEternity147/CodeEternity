import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Code, Check, ArrowRight, AlertCircle, Users, Clock, Award, Star, BookOpen, Download, Terminal, UserCheck, Layers, Zap, BarChart3, Smile, CalendarDays, Target } from 'lucide-react'; // Added more icons

const CourseDetailModal = ({ selectedChildCourse, setSelectedChildCourse }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    // console.log('CourseDetailModal mounted with course:', selectedChildCourse);
    // console.log('CourseId from params:', courseId);
    
    if (!selectedChildCourse) {
      // console.log('No course selected, redirecting to whatweoffer');
      navigate('/whatweoffer');
      return;
    }

    const decodedCourseId = decodeURIComponent(courseId);
    // console.log('Decoded courseId:', decodedCourseId);

    if (decodedCourseId !== selectedChildCourse.key) {
      // console.log('CourseId mismatch, redirecting to whatweoffer');
      navigate('/whatweoffer');
    }
  }, [selectedChildCourse, courseId, navigate]);

  const handleClose = () => {
    // console.log('Closing modal');
    setSelectedChildCourse(null);
    navigate('/whatweoffer');
  };

  if (!selectedChildCourse) {
    // console.log('No course data available');
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
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 bg-slate-100 p-4 flex items-center justify-center transition-opacity duration-500 ease-in-out">
      {/* Modal Container */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ease-in-out scale-95 hover:scale-100">
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-black p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white">
              <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 sm:mr-6 shadow-lg">
                <Code size={32} className="text-pink-400" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{selectedChildCourse.name}</h2>
                <p className="text-purple-300 text-sm sm:text-lg">{selectedChildCourse.category} • Premium Course</p>
                <div className="flex items-center mt-2 sm:mt-3 space-x-3 sm:space-x-4">
                  <div className="flex items-center bg-yellow-400/20 px-2 py-1 rounded-md">
                    <Star className="text-yellow-300 mr-1" size={14} />
                    <span className="text-xs sm:text-sm text-yellow-200">{selectedChildCourse.rating || 4.9} ({selectedChildCourse.ratingCount || 12450} reviews)</span>
                  </div>
                  <div className="flex items-center bg-green-400/20 px-2 py-1 rounded-md">
                    <Users className="text-green-300 mr-1" size={14} />
                    <span className="text-xs sm:text-sm text-green-200">{ selectedChildCourse.students || 12450 } students</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 sm:p-3 hover:bg-white/20 rounded-full transition-all duration-300 text-white hover:text-pink-300"
            >
              <X size={24} sm:size={28} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8">
          {/* Course Overview Section */}
          <div className="mb-8 sm:mb-10 bg-slate-50 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-6">Course Overview</h3>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
              {selectedChildCourse.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { title: "Comprehensive", desc: "Complete curriculum covering all aspects", icon: <BookOpen size={24} className="text-purple-600"/> },
                { title: "Hands-on Projects", desc: "Learn by building real-world applications", icon: <Terminal size={24} className="text-pink-600"/> },
                { title: "Expert-led", desc: "Taught by industry professionals", icon: <UserCheck size={24} className="text-teal-600"/> }
              ].map(item => (
                <div key={item.title} className="bg-white rounded-xl p-4 sm:p-5 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 flex items-start space-x-3 group">
                  <div className="flex-shrink-0 bg-slate-100 p-3 rounded-lg group-hover:bg-purple-100 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-slate-700 font-semibold text-lg mb-1 group-hover:text-purple-700">{item.title}</div>
                    <div className="text-slate-600 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {[
              { value: selectedChildCourse.duration, label: "Weeks", icon: <Clock size={28} />, color: "purple" },
              { value: selectedChildCourse.level, label: "Level", icon: <Layers size={28} />, color: "sky" },
              { value: "95%", label: "Success Rate", icon: <Award size={28} />, color: "green" },
              { value: "24/7", label: "Support", icon: <Smile size={28} />, color: "orange" },
              { value: "Free", label: "Resources", icon: <Download size={28} />, color: "pink" }
            ].map(stat => (
              <div key={stat.label} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 rounded-2xl p-5 sm:p-6 text-center shadow-lg hover:shadow-xl border border-${stat.color}-200 transition-all duration-300 transform hover:scale-105`}>
                <div className={`text-${stat.color}-600 mx-auto mb-2 sm:mb-3`}>{stat.icon}</div>
                <div className={`text-${stat.color}-700 font-bold text-xl sm:text-2xl`}>{stat.value}</div>
                <div className={`text-${stat.color}-800 text-sm font-medium`}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Master */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">What You'll Master</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {whatYoullLearnItems.map((item, index) => (
                    <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 shadow-lg hover:shadow-purple-200/50 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start">
                        <span className="mr-4 mt-1 bg-slate-100 p-2 rounded-lg">{item.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800 text-lg mb-1">{item.title}</div>
                          <div className="text-sm text-slate-600">{item.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Course Curriculum</h3>
                <div className="space-y-4">
                  {selectedChildCourse.curriculum.map((module, index) => (
                    <details key={index} className="group bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-all duration-300 overflow-hidden">
                      <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none group-hover:bg-slate-50">
                        <div className="flex items-center">
                           <div className="mr-4 p-2 bg-slate-100 rounded-lg group-hover:bg-purple-100 transition-colors">{module.icon}</div>
                           <div>
                            <h4 className="font-semibold text-slate-800 text-md sm:text-lg">Module {index + 1}: {module.module}</h4>
                            <span className="text-xs text-slate-500 group-hover:text-purple-600">{module.week} • {module.lessons} lessons</span>
                           </div>
                        </div>
                        <ArrowRight size={20} className="text-slate-500 group-open:rotate-90 transition-transform duration-300" />
                      </summary>
                      <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/50">
                        <p className="text-slate-600 text-sm sm:text-base">{module.description}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Prerequisites */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Prerequisites</h3>
                <div className="bg-sky-50 border-2 border-sky-200 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <span className="bg-sky-100 p-3 rounded-lg text-sky-600 mr-4 flex-shrink-0">
                      <AlertCircle size={24} />
                    </span>
                    <div className="text-sm sm:text-base text-sky-800 font-medium">
                      {selectedChildCourse.prerequisites}
                    </div>
                  </div>
                </div>
              </div>

             
              
              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-2xl p-6 sm:p-8 shadow-2xl text-white transform hover:scale-105 transition-transform duration-300">
                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-5xl font-bold text-yellow-400 mb-1">₹1,999</div>
                  <div className="text-slate-300 text-sm">One-time payment</div>
                  <div className="text-slate-400 text-xs line-through">₹4,999 regular price</div>
                </div>
                <ul className="text-sm space-y-3 mb-8">
                  {[
                    "Lifetime access to course content",
                    "1-on-1 mentorship sessions",
                    "Job placement assistance",
                    "30-day money-back guarantee",
                    "Exclusive community access"
                  ].map(benefit => (
                    <li key={benefit} className="flex items-center">
                      <Check size={18} className="mr-2 text-green-400 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                 <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-10 sm:mt-16 bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl p-8 sm:p-12 shadow-xl border border-slate-200">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Ready to Elevate Your Skills?</h3>
            <p className="text-slate-600 text-lg mb-8">Join thousands of successful students who transformed their careers with our courses.</p>
            <button 
              onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform", "_blank")}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-4 px-10 sm:px-12 rounded-xl font-semibold text-lg flex items-center justify-center mx-auto group transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
            >
              Enroll in {selectedChildCourse.name}
              <ArrowRight size={22} className="ml-3 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <p className="text-sm text-slate-500 mt-6 flex items-center justify-center space-x-4">
                <span className="flex items-center"><CalendarDays size={16} className="mr-1.5 text-purple-500"/>Next batch starts Monday!</span>
                <span className="flex items-center"><Users size={16} className="mr-1.5 text-pink-500"/>Limited seats available.</span>
                <span className="flex items-center"><Award size={16} className="mr-1.5 text-orange-500"/>30-day guarantee.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;