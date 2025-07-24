import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createOrderAndCheckout } from '../../utils/payment';
import { useLocation } from 'react-router-dom';
import placementPrograms from '../../data/placementPrograms';
import { 
  ArrowLeft, Users, Clock, Layers, Star, Check, AlertCircle, ShieldCheck, 
  Sparkles, Trophy, Target, TrendingUp, Award, Play, ChevronRight,
  DollarSign, Calendar, BookOpen, Heart, Zap, Globe, Gift, 
  CheckCircle, MapPin, Building, Briefcase,
  Cross,ArrowRight,
  X
} from 'lucide-react';
import * as FaIcons from 'react-icons/fa';

const AnimatedSection = ({ children, delay = 0, className = "" }) => (
  <div 
    className={`transition-all duration-1000 ease-out opacity-0 translate-y-12 animate-slide-up ${className}`} 
    style={{ 
      animationDelay: `${delay}ms`, 
      animationFillMode: 'forwards'
    }}
  >
    {children}
  </div>
);

const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{prefix}{count}{suffix}</span>;
};

const FloatingElement = ({ children, delay = 0 }) => (
  <div 
    className="animate-float" 
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const PlacementProgramCourseDetails = () => {
  const { programKey } = useParams();
  const navigate = useNavigate();
  const program = placementPrograms.find(p => p.key === decodeURIComponent(programKey));
  const [activeTab, setActiveTab] = useState('overview');

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-8xl mb-8 animate-bounce">🚫</div>
        <h2 className="text-4xl font-bold text-red-500 mb-4 animate-pulse">404 - Program Not Found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }
  const { user } = useAuth();
  const location = useLocation();
   const [loading, setLoading] = useState(false);

  const handlePaymentClick = async () => {
    if (!user) {
      alert('Please log in to enroll.');
      navigate('/login', { state: { from: location } });
      return;
    }

    try {
      const orderAmount = 20000;
      setLoading(true);
      if (!user?.mobile || !/^\d{10}$/.test(user.mobile)) {
        toast.error('First update your profile with mobile number');
        setLoading(false);
        return;
      }

      const orderData = {
        orderId: `order_${Date.now()}`,
        amount: orderAmount,
        customerName: user?.firstName + ' ' + user?.lastName || 'Guest User',
        customerEmail: user?.email || 'guest@example.com',
        customerPhone: user.mobile,
        courseName: program.name // Use the dynamic program name
      };

      await createOrderAndCheckout(orderData);


    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    const handlePlanPayment = async (plan) => {
      try {
        setLoading(true);
        const amount = parseInt(plan.price.replace('₹', ''));
  
        if (!user?.mobile || !/^\d{10}$/.test(user.mobile)) {
          toast.error('First update your profile with mobile number');
          setLoading(false);
          return;
        }
  
        // Prepare order data
        const orderData = {
          orderId: `order_${Date.now()}`,
          amount: amount,
          customerName: user?.firstName + ' ' + user?.lastName || 'Guest User',
          customerEmail: user?.email || 'guest@example.com',
          customerPhone: user.mobile,
          courseName: courseName
        };
  
        await createOrderAndCheckout(orderData);
        // Optionally show a success toast here if needed
      } catch (error) {
        console.error('Payment error:', error);
        toast.error(error.message || 'Failed to process payment. Please try again.');
      } finally {
        setLoading(false);
      }
    };

  const Icon = program.reactIcon && FaIcons[program.reactIcon];

  return (
    <div className="min-h-screen my-20 bg-white relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full opacity-20 blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <AnimatedSection delay={0}>
            <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 mb-8 overflow-hidden shadow-2xl">
              {/* Elegant Pattern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              <div className="absolute inset-0 opacity-40"></div>
              
              <button 
                onClick={() => navigate(-1)} 
                className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-2xl p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10 border border-white/20"
              >
                <X size={24} />
              </button>

              <div className="relative flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <FloatingElement delay={200}>
                    <div className="flex items-center justify-center lg:justify-start mb-6">
                      <div 
                        className="flex items-center justify-center h-24 w-24 rounded-3xl shadow-xl animate-bounce mr-6 border-4 border-white/20" 
                        style={{ backgroundColor: program.iconBgColor }}
                      >
                        {Icon ? <Icon size={48} className="text-white" /> : <span className="text-5xl">{program.icon}</span>}
                      </div>
                      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-5 py-3 rounded-2xl font-bold text-sm animate-pulse shadow-xl border-2 border-amber-300">
                        <ShieldCheck size={18} className="inline mr-2" />
                        Job Placement Guaranteed
                      </div>
                    </div>
                  </FloatingElement>

                  <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                    {program.name}
                  </h1>
                  
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                    {program.summary}
                  </p>

                  {/* Elegant Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <Star className="mx-auto mb-3 text-amber-400" size={28} />
                      <div className="text-2xl font-bold text-white">{program.rating}</div>
                      <div className="text-xs text-blue-200 font-medium">Rating</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <Users className="mx-auto mb-3 text-blue-400" size={28} />
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter end={program.students} suffix="+" />
                      </div>
                      <div className="text-xs text-blue-200 font-medium">Students</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <Clock className="mx-auto mb-3 text-emerald-400" size={28} />
                      <div className="text-2xl font-bold text-white">{program.duration}</div>
                      <div className="text-xs text-blue-200 font-medium">Weeks</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <Trophy className="mx-auto mb-3 text-orange-400" size={28} />
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter 
                          end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                          suffix="%" 
                        />
                      </div>
                      <div className="text-xs text-blue-200 font-medium">Success Rate</div>
                    </div>
                  </div>
                </div>

                <FloatingElement delay={400}>
                  <div className="relative">
                    <img 
                      src={program.sideImg} 
                      alt={program.sideImgAlt} 
                      className="w-80 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/20" 
                    />
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl font-bold shadow-xl animate-bounce border border-emerald-400">
                      <Zap className="inline mr-2" size={20} />
                      Job Ready in {program.duration} Weeks!
                    </div>
                  </div>
                </FloatingElement>
              </div>
            </div>
          </AnimatedSection>

          {/* Guarantee Highlight */}
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 mb-8 text-center shadow-xl border border-emerald-500">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <ShieldCheck size={32} className="text-white animate-pulse" />
                <span className="text-2xl font-bold text-white">{program.guaranteeTerms}</span>
                <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/30">
                  <AnimatedCounter 
                    end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                    suffix="% Success Rate" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Elegant Navigation Tabs */}
          <AnimatedSection delay={300}>
            <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden border border-gray-100">
              <div className="flex flex-wrap border-b border-gray-200">
                {[
                  { id: 'overview', label: 'Overview', icon: Sparkles },
                  { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
                  { id: 'placements', label: 'Placements', icon: TrendingUp },
                  { id: 'pricing', label: 'Pricing', icon: DollarSign },
                  { id: 'success', label: 'Success Stories', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-8 py-5 font-semibold transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-slate-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={22} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Tab Content with White Background */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="p-8 mb-20 ">
                <AnimatedSection delay={100}>
                  <div className="mb-12">
                    <h2 className="text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                        <Sparkles className="text-white animate-spin-slow" size={24} />
                      </div>
                      Program Overview
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-4xl">{program.description}</p>
                    
                    {/* Features Grid with Better Colors */}
                    {program.programFeatures && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {program.programFeatures.map((feature, idx) => (
                          <AnimatedSection key={idx} delay={200 + idx * 100}>
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-blue-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:scale-105 group">
                              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>
                    )}

                    {/* Learning Outcomes with Elegant Design */}
                    {program.learningOutcomes && (
                      <AnimatedSection delay={400}>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-10 mb-12 border border-emerald-200">
                          <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                              <Target className="text-white" size={24} />
                            </div>
                            What You'll Achieve
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {program.learningOutcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckCircle className="text-white" size={18} />
                                </div>
                                <span className="text-gray-700 font-medium leading-relaxed">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AnimatedSection>
                    )}

                    {/* Technologies with Modern Cards */}
                    {program.technologies && (
                      <AnimatedSection delay={500}>
                        <div className="mb-12">
                          <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                              <Globe className="text-white" size={24} />
                            </div>
                            Technologies You'll Master
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {program.technologies.map((tech, idx) => (
                              <div key={idx} className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                                                               <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                                <div className="font-bold text-slate-900 text-sm mb-1">{tech.name}</div>
                                <div className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full">{tech.level}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AnimatedSection>
                    )}

                    {/* Target Audience */}
                    <AnimatedSection delay={600}>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 mb-12 border border-blue-200">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                            <Users className="text-white" size={24} />
                          </div>
                          Who Should Join?
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {program.targetAudience.split(',').map((audience, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                              {audience.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    {/* Skills Section */}
                    <AnimatedSection delay={700}>
                      <div className="mb-12">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <Award className="text-white" size={24} />
                          </div>
                          Key Skills You'll Gain
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {program.skills.map((skill, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-2xl text-sm font-semibold border-2 border-purple-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </AnimatedSection>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div className="p-8 mb-28 ">
                <AnimatedSection delay={100}>
                  <h2 className="text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                      <BookOpen className="text-white" size={24} />
                    </div>
                    Comprehensive Curriculum
                  </h2>
                  
                  <div className="space-y-8">
                    {program.curriculum.map((module, idx) => (
                      <AnimatedSection key={idx} delay={200 + idx * 100}>
                        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border-2 border-slate-200 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-500">
                          <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-6">
                                <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg">
                                  {module.weeks}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">{module.module}</h3>
                              </div>
                              <div className="flex gap-6 text-sm text-gray-600">
                                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
                                  <BookOpen size={16} className="text-blue-500" />
                                  {module.lessons} lessons
                                </span>
                                {module.projects && (
                                  <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
                                    <Trophy size={16} className="text-orange-500" />
                                    {module.projects} projects
                                  </span>
                                )}
                                {module.assessments && (
                                  <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
                                    <CheckCircle size={16} className="text-emerald-500" />
                                    {module.assessments} assessments
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {module.description.map((desc, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ChevronRight className="text-white" size={16} />
                                  </div>
                                  <span className="text-gray-700 font-medium">{desc.replace(/^•\s*/, '')}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            )}

            {/* Placements Tab */}
            {activeTab === 'placements' && (
              <div className="p-8 mb-28">
                <AnimatedSection delay={100}>
                  <h2 className="text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    Placement Excellence
                  </h2>

                  {/* Placement Stats */}
                  {program.placementStats && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white text-center shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-bold mb-3">
                          <AnimatedCounter end={program.placementStats.totalPlacements} />
                        </div>
                        <div className="text-sm opacity-90 font-semibold">Total Placements</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-bold mb-3">{program.placementStats.averageSalary}</div>
                        <div className="text-sm opacity-90 font-semibold">Average Salary</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white text-center shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-bold mb-3">{program.placementStats.highestSalary}</div>
                        <div className="text-sm opacity-90 font-semibold">Highest Salary</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center shadow-2xl hover:scale-105 transition-all duration-300">
                        <div className="text-4xl font-bold mb-3">
                          <AnimatedCounter 
                            end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                            suffix="%" 
                          />
                        </div>
                        <div className="text-sm opacity-90 font-semibold">Success Rate</div>
                      </div>
                    </div>
                  )}

                  {/* Salary Ranges */}
                  {program.placementStats?.salaryRanges && (
                    <AnimatedSection delay={200}>
                      <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-3xl p-10 mb-12 border border-gray-200">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8">Salary Distribution</h3>
                        <div className="space-y-6">
                          {program.placementStats.salaryRanges.map((range, idx) => (
                            <div key={idx} className="flex items-center gap-6">
                              <div className="w-32 text-sm font-bold text-slate-700 bg-white px-4 py-2 rounded-xl border border-gray-200">{range.range}</div>
                              <div className="flex-1 bg-gray-300 rounded-full h-4 overflow-hidden shadow-inner">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                                  style={{ 
                                    width: `${range.percentage}%`,
                                    animationDelay: `${300 + idx * 100}ms`
                                  }}
                                ></div>
                              </div>
                              <div className="w-16 text-sm font-bold text-slate-700 bg-white px-3 py-2 rounded-xl border border-gray-200">{range.percentage}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Guarantee Details */}
                  {program.guaranteeDetails && (
                    <AnimatedSection delay={250}>
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-10 mb-12 border-2 border-emerald-200 shadow-lg">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="text-white" size={24} />
                          </div>
                          Guarantee Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                          <div className="text-center bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">{program.guaranteeDetails.timeframe}</div>
                            <div className="text-sm text-gray-600 font-semibold">Placement Timeframe</div>
                          </div>
                          <div className="text-center bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">{program.guaranteeDetails.minimumSalary}</div>
                            <div className="text-sm text-gray-600 font-semibold">Minimum Salary</div>
                          </div>
                          <div className="text-center bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm">
                            <div className="text-3xl font-bold text-emerald-600 mb-2">{program.guaranteeDetails.avgTimeToPlacement}</div>
                            <div className="text-sm text-gray-600 font-semibold">Avg. Time to Placement</div>
                          </div>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm">
                          <h4 className="font-bold text-slate-900 mb-4 text-lg">Conditions for Guarantee:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {program.guaranteeDetails.conditions.map((condition, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="text-white" size={14} />
                                </div>
                                <span className="text-gray-700 font-medium">{condition}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  )}

                  {/* Placement Partners */}
                  <AnimatedSection delay={300}>
                    <div className="mb-12">
                      <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                          <Building className="text-white" size={24} />
                        </div>
                        Our Hiring Partners
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {program.placementPartners.map((partner, idx) => (
                          <AnimatedSection key={idx} delay={400 + idx * 100}>
                            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 text-center hover:border-blue-300 hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                              <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                className="h-20 w-auto object-contain mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" 
                              />
                              <div className="font-bold text-slate-900 text-sm mb-2">{partner.name}</div>
                              {partner.tier && (
                                <div className="text-xs text-blue-600 font-bold mb-2 bg-blue-50 px-3 py-1 rounded-full">{partner.tier}</div>
                              )}
                              {partner.avgSalary && (
                                <div className="text-xs text-gray-600 mb-1 font-semibold">Avg: {partner.avgSalary}</div>
                              )}
                              {partner.positions && (
                                <div className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-full">{partner.positions} positions</div>
                              )}
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Top Roles */}
                  {program.placementStats?.topRoles && (
                    <AnimatedSection delay={500}>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-200">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <Briefcase className="text-white" size={24} />
                          </div>
                          Top Placement Roles
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {program.placementStats.topRoles.map((role, idx) => (
                            <span 
                              key={idx} 
                              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>
                  )}
                </AnimatedSection>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div className="p-8 mb-28 ">
                <AnimatedSection delay={100}>
                  <h2 className="text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center">
                      <DollarSign className="text-white" size={24} />
                    </div>
                    Investment & Returns
                  </h2>

                  {/* Main Pricing Card */}
                  <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-8 py-4 rounded-bl-3xl font-bold text-sm shadow-lg">
                      <Gift className="inline mr-2" size={18} />
                      {program.pricing?.discount} OFF
                    </div>
                    <div className="text-center relative z-10">
                      <div className="text-xl opacity-90 mb-4 font-semibold">Program Fee</div>
                      <div className="flex items-center justify-center gap-6 mb-6">
                        <span className="text-3xl line-through opacity-60">{program.pricing?.originalPrice}</span>
                        <span className="text-6xl font-bold">{program.pricing?.currentPrice}</span>
                      </div>
                      <div className="text-xl opacity-90 mb-8 font-medium">One-time payment • Lifetime support</div>
                     
                      {user ? (
              // User is logged in - show enroll button
              <button 
                onClick={handlePaymentClick}
                className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-3 sm:py-4 px-6 sm:px-10 md:px-12 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center mx-auto group transition-all duration-300 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                 Enroll Now & Get Placed!
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
                    </div>
                  </div>

                 

                  {/* Scholarships */}
                  {program.pricing?.scholarships && (
                    <AnimatedSection delay={300}>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-10 border border-amber-200">
                        <h3 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                            <Award className="text-white" size={24} />
                          </div>
                          Available Scholarships
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {program.pricing.scholarships.map((scholarship, idx) => (
                                                       <div key={idx} className="bg-white rounded-2xl p-8 border border-amber-200 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                                       <div className="text-2xl font-bold text-slate-900 mb-3">{scholarship.type}</div>
                                                       <div className="text-4xl font-bold text-emerald-600 mb-4">{scholarship.discount}</div>
                                                       <div className="text-sm text-gray-600 font-medium leading-relaxed">{scholarship.criteria}</div>
                                                     </div>
                                                   ))}
                                                 </div>
                                               </div>
                                             </AnimatedSection>
                                           )}
                         
                                           {/* Support System */}
                                           {program.supportSystem && (
                                             <AnimatedSection delay={400}>
                                               <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-10 mt-12 border border-blue-200">
                                                 <h3 className="text-3xl font-bold text-slate-900 mb-8">Complete Support System</h3>
                                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.mentoringHours}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Mentoring Hours</div>
                                                   </div>
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.careerCounseling}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Career Counseling</div>
                                                   </div>
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.technicalSupport}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Technical Support</div>
                                                   </div>
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.placementSupport}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Placement Support</div>
                                                   </div>
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.alumniNetwork}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Alumni Network</div>
                                                   </div>
                                                   <div className="text-center bg-white p-6 rounded-2xl border border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                                                     <div className="text-2xl font-bold text-blue-600 mb-2">{program.supportSystem.communitySupport}</div>
                                                     <div className="text-sm text-gray-600 font-semibold">Community Support</div>
                                                   </div>
                                                 </div>
                                               </div>
                                             </AnimatedSection>
                                           )}
                                         </AnimatedSection>
                                       </div>
                                     )}
                      
            {/* Success Stories Tab */}
                                     {activeTab === 'success' && (
                                       <div className="p-8 mb-28">
                                         <AnimatedSection delay={100}>
                                           <h2 className="text-4xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                                             <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                               <Heart className="text-white" size={24} />
                                             </div>
                                             Success Stories
                                           </h2>
                         
                                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                             {program.successStories.map((story, idx) => (
                                               <AnimatedSection key={idx} delay={200 + idx * 100}>
                                                 <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                                                   <div className="flex items-start gap-6 mb-8">
                                                     <img 
                                                       src={story.avatar} 
                                                       alt={story.name} 
                                                       className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg" 
                                                     />
                                                     <div className="flex-1">
                                                       <div className="font-bold text-2xl text-slate-900 mb-2">{story.name}</div>
                                                       <div className="text-blue-600 font-bold text-lg mb-1">{story.role}</div>
                                                       <div className="text-gray-600 font-semibold mb-2">{story.company}</div>
                                                       {story.salary && (
                                                         <div className="text-emerald-600 font-bold text-xl bg-emerald-50 px-3 py-1 rounded-lg inline-block">{story.salary}</div>
                                                       )}
                                                     </div>
                                                   </div>
                                                   
                                                   <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6 bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                                                     "{story.testimonialFull || story.text}"
                                                   </blockquote>
                                                   
                                                   {story.background && (
                                                     <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                                                       <span className="font-bold text-purple-700">Background: </span>
                                                       <span className="text-gray-700 font-medium">{story.background}</span>
                                                     </div>
                                                   )}
                                                 </div>
                                               </AnimatedSection>
                                             ))}
                                           </div>
                                         </AnimatedSection>
                                       </div>
                                     )}
                                   </div>
                         
                                   {/* FAQ Section */}
                                   {program.faqs && (
                                     <AnimatedSection delay={600}>
                                       <div className="bg-white rounded-3xl shadow-xl p-10 mt-12 border border-gray-200">
                                         <h2 className="text-4xl font-bold text-slate-900 mb-10 text-center flex items-center justify-center gap-4">
                                           <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                             <AlertCircle className="text-white" size={24} />
                                           </div>
                                           Frequently Asked Questions
                                         </h2>
                                         <div className="space-y-6">
                                           {program.faqs.map((faq, idx) => (
                                             <details key={idx} className="group border-2 border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 hover:border-blue-300">
                                               <summary className="flex items-center justify-between p-8 cursor-pointer font-bold text-slate-900 text-lg">
                                                 <span>{faq.question}</span>
                                                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                                   <ChevronRight className="group-open:rotate-90 transition-transform duration-300 text-white" size={18} />
                                                 </div>
                                               </summary>
                                               <div className="px-8 pb-8 text-gray-700 leading-relaxed bg-white rounded-b-2xl border-t border-gray-200">
                                                 {faq.answer}
                                               </div>
                                             </details>
                                           ))}
                                         </div>
                                       </div>
                                     </AnimatedSection>
                                   )}
                         
                                   {/* Prerequisites Section */}
                                   <AnimatedSection delay={650}>
                                     <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-10 mt-12 border border-orange-200">
                                       <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
                                         <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                                           <AlertCircle className="text-white" size={24} />
                                         </div>
                                         Prerequisites
                                       </h2>
                                       <div className="bg-white rounded-2xl p-8 border border-orange-200 shadow-sm">
                                         <p className="text-gray-700 leading-relaxed text-lg font-medium">{program.prerequisites}</p>
                                       </div>
                                     </div>
                                   </AnimatedSection>
                         
                                   {/* Bottom CTA */}
                                   <AnimatedSection delay={700}>
                                     <div className="bg-gradient-to-r mb-20 from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-16 mt-16 text-center text-white relative overflow-hidden shadow-2xl">
                                       {/* Background decoration */}
                                       <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                                       <div className="absolute inset-0 opacity-40"></div>
                                       
                                       <div className="relative z-10">
                                         <div className="text-7xl mb-8 animate-bounce">🚀</div>
                                         <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
                                         <p className="text-2xl opacity-90 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                                           Join thousands of successful graduates who landed their dream jobs with our placement guarantee program
                                         </p>
                                         
                                         {/* Stats Row */}
                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                                           <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                             <div className="text-4xl font-bold mb-3">
                                               <AnimatedCounter end={program.students} suffix="+" />
                                             </div>
                                             <div className="text-sm opacity-90 font-semibold">Students Placed</div>
                                           </div>
                                           <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                             <div className="text-4xl font-bold mb-3">{program.rating}⭐</div>
                                             <div className="text-sm opacity-90 font-semibold">Average Rating</div>
                                           </div>
                                           <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                             <div className="text-4xl font-bold mb-3">
                                               <AnimatedCounter 
                                                 end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                                                 suffix="%" 
                                               />
                                             </div>
                                             <div className="text-sm opacity-90 font-semibold">Success Rate</div>
                                           </div>
                                         </div>
                         
                                         <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-10">
                                           <button 
                                             className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-12 py-6 rounded-2xl font-bold text-2xl hover:scale-105 transition-all duration-300 shadow-2xl border-2 border-amber-300"
                                             onClick={() => alert('Redirect to enrollment page')}
                                           >
                                             <Play className="inline mr-3" size={28} />
                                             Start Your Journey Now
                                           </button>
                                           
                                         </div>
                         
                                         {/* Trust indicators */}
                                         <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
                                           <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                             <ShieldCheck size={24} className="text-emerald-400" />
                                             <span className="font-semibold">100% Placement Guarantee</span>
                                           </div>
                                           <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                             <Trophy size={24} className="text-amber-400" />
                                             <span className="font-semibold">Industry Recognized Certification</span>
                                           </div>
                                           <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20">
                                             <Users size={24} className="text-blue-400" />
                                             <span className="font-semibold">24/7 Support</span>
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                   </AnimatedSection>
                         
                                 
                                 </div>
                               </div>
                         
                               {/* Enhanced Animations and Styles */}
                               <style jsx>{`
                                 @keyframes slide-up {
                                   from { 
                                     opacity: 0; 
                                     transform: translateY(60px); 
                                   }
                                   to { 
                                     opacity: 1; 
                                     transform: translateY(0); 
                                   }
                                 }
                                 
                                 @keyframes float {
                                   0%, 100% { 
                                     transform: translateY(0px); 
                                   }
                                   50% { 
                                     transform: translateY(-15px); 
                                   }
                                 }
                                 
                                 @keyframes spin-slow {
                                   from { 
                                     transform: rotate(0deg); 
                                   }
                                   to { 
                                     transform: rotate(360deg); 
                                   }
                                 }
                                 
                                 @keyframes pulse-slow {
                                   0%, 100% { 
                                     opacity: 0.8; 
                                   }
                                   50% { 
                                     opacity: 0.4; 
                                   }
                                 }
                                 
                                 @keyframes pulse-slower {
                                   0%, 100% { 
                                     opacity: 0.6; 
                                   }
                                   50% { 
                                     opacity: 0.2; 
                                   }
                                 }
                         
                                 .animate-slide-up { 
                                   animation: slide-up 1s ease-out forwards; 
                                 }
                                 
                                 .animate-float { 
                                   animation: float 4s ease-in-out infinite; 
                                 }
                                 
                                 .animate-spin-slow { 
                                   animation: spin-slow 4s linear infinite; 
                                 }
                                 
                                 .animate-pulse-slow { 
                                   animation: pulse-slow 3s ease-in-out infinite; 
                                   animation-delay: 1s;
                                 }
                                 
                                 .animate-pulse-slower { 
                                   animation: pulse-slower 4s ease-in-out infinite; 
                                   animation-delay: 2s;
                                 }
                         
                                 /* Custom scrollbar styling */
                                 ::-webkit-scrollbar {
                                   width: 10px;
                                 }
                                 
                                 ::-webkit-scrollbar-track {
                                   background: #f8fafc;
                                   border-radius: 10px;
                                 }
                                 
                                 ::-webkit-scrollbar-thumb {
                                   background: linear-gradient(to bottom, #3b82f6, #1e40af);
                                   border-radius: 10px;
                                   border: 2px solid #f8fafc;
                                 }
                                 
                                 ::-webkit-scrollbar-thumb:hover {
                                   background: linear-gradient(to bottom, #2563eb, #1d4ed8);
                                 }
                         
                                 /* Smooth transitions for all interactive elements */
                                 * {
                                   transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
                                   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                                 }
                         
                                 /* Enhanced hover effects */
                                 .hover-lift:hover {
                                   transform: translateY(-8px) scale(1.02);
                                   box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                                 }
                         
                                 /* Glassmorphism effect */
                                 .glass {
                                   background: rgba(255, 255, 255, 0.1);
                                   backdrop-filter: blur(10px);
                                   border: 1px solid rgba(255, 255, 255, 0.2);
                                 }
                         
                                 /* Responsive typography */
                                 @media (max-width: 768px) {
                                   h1 { font-size: 2.5rem !important; }
                                   h2 { font-size: 2rem !important; }
                                   h3 { font-size: 1.5rem !important; }
                                 }
                         
                                 /* Focus styles for accessibility */
                                 button:focus, 
                                 details:focus {
                                   outline: 2px solid #3b82f6;
                                   outline-offset: 2px;
                                 }
                               `}</style>
                             </div>
                           );
                         };
                         
                         export default PlacementProgramCourseDetails;