import React, { useState } from 'react';
import axios from 'axios';
import option from "../../data/FeatureData"
import { toast } from 'react-toastify';
const ServiceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, course, description } = formData;
    if (!name || !email || !course || !description) {
      toast.error('Please fill out all fields before submitting.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('/api/contact', {
        name: name,
        email: email,
        parentCategory: 'Service Form Inquiry',
        childCourse: course,
        message: description,
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success('Form submitted successfully!');
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            course: '',
            description: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to submit the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[700px]">
          
          {/* Left Side - Hero Content */}
          <div className="lg:w-1/2 bg-slate-900 p-6 lg:p-16 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle decorative elements */}
            <div className="absolute top-12 right-12 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute bottom-12 left-8 w-20 h-20 bg-blue-400 rounded-full opacity-15 animate-float"></div>
            
            <div className="relative z-10 text-white">
              <div className="mb-6">
                <span className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Expert Support
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                Get Professional
                <span className="block text-blue-400 mt-2">
                  Help Today
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl mb-8 text-slate-300 leading-relaxed">
                Connect with our expert team for personalized guidance and accelerate your learning journey
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Expert Guidance</h3>
                    <p className="text-slate-400 text-sm">Industry professionals at your service</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Quick Response</h3>
                    <p className="text-slate-400 text-sm">Get answers within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Personalized Solutions</h3>
                    <p className="text-slate-400 text-sm">Tailored approach for your goals</p>
                  </div>
                </div>
              </div>    
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-6 lg:p-16 flex flex-col justify-center  bg-purple-50 shadow-xl rounded-xl">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Start Your Journey
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Fill out the form below and we’ll connect you with the right expert
                </p>
                <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
              </div>

              {isSubmitted ? (
                <div className="text-center animate-bounce">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-600 mb-2">Thank You!</h3>
                  <p className="text-slate-600">Your request has been submitted successfully.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                        focusedField === 'name' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-slate-200 hover:border-slate-300'
                      } focus:outline-none`}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 ${
                        focusedField === 'email' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-slate-200 hover:border-slate-300'
                      } focus:outline-none`}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-sm font-medium text-slate-700 mb-2">
                      Course Interest
                    </label>
                    <div className="relative group">
                      <select
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('course')}
                        onBlur={() => setFocusedField('')}
                        required
                        className={`w-full px-5 py-4 pr-14 border-2 rounded-2xl transition-all duration-300 bg-white appearance-none cursor-pointer shadow-sm hover:shadow-lg ${
                          focusedField === 'course' 
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-2xl shadow-blue-500/30 border-opacity-80' 
                            : 'border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10'
                        } focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:ring-opacity-50`}
                      >
                        <option value="" disabled className="text-slate-400 font-medium bg-gradient-to-r from-slate-50 to-gray-50">
                          🎯 Select your preferred course
                        </option>
                        {option.map((item, index) => {
                          // Define icons for different course types
                          const getIcon = (title) => {
                            if (title.toLowerCase().includes('app')) return '📱';
                            if (title.toLowerCase().includes('web')) return '💻';
                            if (title.toLowerCase().includes('chatbot')) return '🤖';
                            if (title.toLowerCase().includes('cloud')) return '☁️';
                            if (title.toLowerCase().includes('market')) return '🛒';
                            if (title.toLowerCase().includes('lms') || title.toLowerCase().includes('erp') || title.toLowerCase().includes('ems')) return '🏢';
                            return '📚';
                          };
                          
                                                     return (
                             <option key={index} value={item.title} className="py-4 px-3 font-medium text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 transition-all duration-200 my-1">
                               {getIcon(item.title)} {item.title}
                             </option>
                           );
                        })}
                      </select>
                      
                      {/* Enhanced custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                        <div className={`w-7 h-7 transition-all duration-300 ${
                          focusedField === 'course' ? 'rotate-180 scale-110' : 'group-hover:scale-110'
                        }`}>
                          <svg className="w-7 h-7 text-slate-400 group-hover:text-blue-500 transition-all duration-300 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Enhanced focus indicator with glow effect */}
                      {focusedField === 'course' && (
                        <div className="absolute inset-0 border-2 border-blue-500 rounded-xl pointer-events-none animate-pulse-glow"></div>
                      )}
                      
                      {/* Enhanced background glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-indigo-500/6 to-purple-500/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none blur-sm"></div>
                      
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-indigo-500/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                      Describe Your Requirements
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('description')}
                      onBlur={() => setFocusedField('')}
                      rows="4"
                      required
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 resize-none ${
                        focusedField === 'description' 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-slate-200 hover:border-slate-300'
                      } focus:outline-none`}
                      placeholder="Tell us about your goals, current skill level, or specific challenges..."
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-slate-900 text-white py-4 rounded-lg font-semibold hover:bg-slate-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                  
                  <p className="text-center text-xs text-slate-500 mt-3">
                    We’ll respond within 24 hours with personalized assistance
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Enhanced dropdown styling */
        select option {
          padding: 16px 20px;
          font-size: 14px;
          background: white;
          color: #374151;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          margin: 4px 0;
          border-radius: 8px;
        }

        select option:hover {
          background: #f3f4f6;
          color: #1f2937;
        }

        select option:checked {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          font-weight: 600;
        }

        /* Custom scrollbar for dropdown */
        select::-webkit-scrollbar {
          width: 8px;
        }

        select::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        select::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Enhanced focus animations */
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ServiceForm;