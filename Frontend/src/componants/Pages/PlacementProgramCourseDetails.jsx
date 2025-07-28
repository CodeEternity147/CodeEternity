import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
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
  Cross, ArrowRight, X, Menu ,HelpCircle,
  MoonIcon,IndianRupee 
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

const FaqItem = ({ faq, isOpen, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="border-b border-gray-700/50 py-5 sm:py-6 hover:border-cyan-500/30 transition-colors duration-300"
  >
    <dt>
      <button 
        onClick={onClick}
        className="flex w-full items-start justify-between text-left group"
      >
        <span className="text-base sm:text-lg font-semibold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">
          {faq.question}
        </span>
        <span className="ml-6 flex h-7 items-center">
          {isOpen ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-cyan-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 90 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-6 w-6 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            </motion.div>
          )}
        </span>
      </button>
    </dt>
    <motion.dd 
      initial={false}
      animate={{ 
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
        marginTop: isOpen ? '1rem' : 0
      }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      {isOpen && (
        <div className="pr-12">
          <p className="text-base leading-7 text-gray-300 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            {faq.answer}
          </p>
        </div>
      )}
    </motion.dd>
  </motion.div>
);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  if (!program) {
    return (
      <div className="min-h-screen flex flex-col  items-center justify-center bg-white px-4">
        <div className="text-6xl sm:text-8xl mb-6 sm:mb-8 animate-bounce">🚫</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-4 animate-pulse text-center">404 - Program Not Found</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-medium hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
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
      const orderAmount = 19999;
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
        courseName: program.name
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

      const orderData = {
        orderId: `order_${Date.now()}`,
        amount: amount,
        customerName: user?.firstName + ' ' + user?.lastName || 'Guest User',
        customerEmail: user?.email || 'guest@example.com',
        customerPhone: user.mobile,
        courseName: program.name
      };

      await createOrderAndCheckout(orderData);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Icon = program.reactIcon && FaIcons[program.reactIcon];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
    { id: 'placements', label: 'Placements', icon: TrendingUp },
    { id: 'pricing', label: 'Pricing', icon:MoonIcon },
    { id: 'success', label: 'Success Stories', icon: Heart }
  ];

  return (
    <div className="min-h-screen  bg-white relative overflow-hidden pt-12 sm:pt-20 lg:pt-12">
      {/* Subtle Background Elements - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 sm:-top-40 -left-20 sm:-left-40 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-30 blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -right-20 sm:-right-40 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-30 blur-2xl sm:blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 sm:w-72 h-36 sm:h-72 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full opacity-20 blur-2xl sm:blur-3xl animate-pulse-slower"></div>
      </div>

      <div className="relative z-10 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
       
{/* Hero Section - Premium Dark Design */}
<AnimatedSection delay={0}>
  <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-3xl p-6 sm:p-8 lg:p-10 mb-6 lg:mb-8 overflow-hidden shadow-2xl border border-gray-700">
    {/* Premium Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>
    
    {/* Close Button */}
    <button 
      onClick={() => navigate(-1)} 
      className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-gray-800/80 backdrop-blur-xl hover:bg-gray-700/80 text-gray-200 rounded-2xl p-3 sm:p-4 shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-cyan-500/20 z-10 border border-gray-600 hover:border-cyan-400/50 group"
    >
      <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
    </button>

    <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left w-full">
        <FloatingElement delay={200}>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mb-6 sm:mb-8 gap-4 sm:gap-8">
            {/* Icon Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
              <div 
                className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 rounded-3xl shadow-2xl border-4 border-gray-700 backdrop-blur-sm" 
                style={{ 
                  background: `linear-gradient(135deg, ${program.iconBgColor} 0%, 100%)`
                }}
              >
                {Icon ? (
                  <Icon size={window.innerWidth < 640 ? 36 : 44} className="text-white drop-shadow-lg" />
                ) : (
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">{program.icon}</span>
                )}
              </div>
            </div>
            
            {/* Guarantee Badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 rounded-2xl font-bold text-sm sm:text-base shadow-xl border border-amber-400/50 transform hover:scale-105 transition-all duration-300">
                <ShieldCheck size={20} className="inline mr-2" />
                <span className="hidden sm:inline">Job Placement Guaranteed</span>
                <span className="sm:hidden">Guaranteed Job</span>
              </div>
            </div>
          </div>
        </FloatingElement>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 mb-4 leading-tight tracking-tight">
          {program.name}
        </h1>
        
        {/* Summary */}
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
          {program.summary}
        </p>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-5 text-center border border-gray-700 hover:border-cyan-500/50 transition-all duration-500 shadow-xl hover:shadow-cyan-500/20"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-amber-500/20">
                <Star className="mx-auto text-amber-400" size={24} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{program.rating}</div>
            <div className="text-xs text-gray-400 font-medium mt-1">Rating</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-5 text-center border border-gray-700 hover:border-blue-500/50 transition-all duration-500 shadow-xl hover:shadow-blue-500/20"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-blue-500/20">
                <Users className="mx-auto text-blue-400" size={24} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              <AnimatedCounter end={program.students} suffix="+" />
            </div>
            <div className="text-xs text-gray-400 font-medium mt-1">Students</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-5 text-center border border-gray-700 hover:border-emerald-500/50 transition-all duration-500 shadow-xl hover:shadow-emerald-500/20"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-emerald-500/20">
                <Clock className="mx-auto text-emerald-400" size={24} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{program.duration}</div>
            <div className="text-xs text-gray-400 font-medium mt-1">Weeks</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-5 text-center border border-gray-700 hover:border-orange-500/50 transition-all duration-500 shadow-xl hover:shadow-orange-500/20"
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-orange-500/20">
                <Trophy className="mx-auto text-orange-400" size={24} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">
              <AnimatedCounter 
                end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                suffix="%" 
              />
            </div>
            <div className="text-xs text-gray-400 font-medium mt-1">Success</div>
          </motion.div>
        </div>
      </div>

      {/* Right Content - Image */}
      <FloatingElement delay={400}>
        <div className="relative w-full lg:w-auto flex justify-center">
          {/* Main Image Container */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <img 
              src={program.sideImg} 
              alt={program.sideImgAlt} 
              className="relative w-72 sm:w-80 lg:w-96 h-52 sm:h-60 lg:h-64 object-cover rounded-3xl shadow-2xl border-4 border-gray-700 group-hover:border-cyan-400/50 transition-all duration-500" 
            />
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-3 rounded-2xl font-bold shadow-2xl border border-emerald-400/50 flex items-center"
            >
              <Zap className="mr-2 animate-pulse" size={20} />
              <span className="hidden sm:inline">Job Ready in {program.duration} Weeks!</span>
              <span className="sm:hidden">{program.duration}W Ready!</span>
            </motion.div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
        </div>
      </FloatingElement>
    </div>
  </div>
</AnimatedSection>

          {/* Guarantee Highlight - Mobile Optimized */}
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8 text-center shadow-xl border border-emerald-500">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <ShieldCheck size={24} className="text-white animate-pulse sm:hidden" />
                <ShieldCheck size={32} className="hidden sm:block text-white animate-pulse" />
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center">{program.guaranteeTerms}</span>
                <div className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold border border-white/30">
                  <AnimatedCounter 
                    end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                    suffix="% Success Rate" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mobile-First Navigation Tabs */}
          <AnimatedSection delay={300}>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl mb-4 sm:mb-6 lg:mb-8 overflow-hidden border border-gray-100">
              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-slate-900 to-blue-900 text-white font-semibold"
                >
                  <span className="flex items-center gap-2">
                    {tabs.find(tab => tab.id === activeTab)?.icon && 
                      React.createElement(tabs.find(tab => tab.id === activeTab).icon, { size: 20 })
                    }
                    {tabs.find(tab => tab.id === activeTab)?.label}
                  </span>
                  <Menu size={20} className={`transition-transform duration-300 ${mobileMenuOpen ? 'rotate-90' : ''}`} />
                </button>
                
                {mobileMenuOpen && (
                  <div className="border-t border-gray-200">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 font-semibold transition-all duration-300 ${
                          activeTab === tab.id 
                            ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white' 
                            : 'text-gray-600 hover:text-slate-900 hover:bg-gray-50'
                        }`}
                      >
                        <tab.icon size={18} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 font-semibold transition-all duration-300 text-sm sm:text-base ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-slate-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={18} className="sm:hidden" />
                    <tab.icon size={22} className="hidden sm:block" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Tab Content with Enhanced Mobile Layout */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            
            {/* Overview Tab - Mobile Optimized */}
            {activeTab === 'overview' && (
              <div className="p-4 sm:p-6 lg:p-8 mb-16 sm:mb-20">
                <AnimatedSection delay={100}>
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                        <Sparkles className="text-white animate-spin-slow" size={20} />
                      </div>
                      <span className="text-center sm:text-left">Program Overview</span>
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8 lg:mb-10 max-w-4xl">{program.description}</p>
                    
                    {/* Features Grid - Mobile First */}
                    {program.programFeatures && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-16">
                        {program.programFeatures.map((feature, idx) => (
                          <AnimatedSection key={idx} delay={200 + idx * 100}>
                            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 hover:scale-105 group">
                              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 text-center sm:text-left">{feature.icon}</div>
                              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-3 text-center sm:text-left">{feature.title}</h3>
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center sm:text-left">{feature.description}</p>
                            </div>
                          </AnimatedSection>
                        ))}
                      </div>
                    )}

                    {/* Learning Outcomes - Mobile Optimized */}
                    {program.learningOutcomes && (
                      <AnimatedSection delay={400}>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border border-emerald-200">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                              <Target className="text-white" size={20} />
                            </div>
                            <span className="text-center sm:text-left">What You'll Achieve</span>
                          </h3>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {program.learningOutcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-all duration-300">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckCircle className="text-white" size={14} />
                                </div>
                                <span className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AnimatedSection>
                    )}

                    {/* Technologies - Mobile Grid */}
                    {program.technologies && (
                      <AnimatedSection delay={500}>
                        <div className="mb-8 sm:mb-12">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                              <Globe className="text-white" size={20} />
                            </div>
                            <span className="text-center sm:text-left">Technologies You'll Master</span>
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                            {program.technologies.map((tech, idx) => (
                              <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">{tech.icon}</div>
                                <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">{tech.name}</div>
                                <div className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full">{tech.level}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AnimatedSection>
                    )}

                    {/* Target Audience - Mobile Cards */}
                    <AnimatedSection delay={600}>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border border-blue-200">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                            <Users className="text-white" size={20} />
                          </div>
                           
                        <span className="text-center sm:text-left">Who Should Join?</span>
                        </h3>
                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start">
                          {program.targetAudience.split(',').map((audience, idx) => (
                            <span key={idx} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center">
                              {audience.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </AnimatedSection>

                    {/* Skills Section - Mobile Optimized */}
                    <AnimatedSection delay={700}>
                      <div className="mb-2 sm:mb-4">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                          <Award className="text-white" size={20} />
                          </div>
                          <span className="text-center sm:text-left">Skills You'll Develop</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                                    {program.skills && program.skills.length > 0 ? (
                            program.skills.map((skill, idx) => (
                              <div key={idx} className="bg-white border border-purple-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300 hover:scale-105 group">
                                <div className="flex items-center gap-3 sm:gap-4">
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Check className="text-white" size={16} />
                                  </div>
                                  <div>
                                    <div className="font-bold text-black  text-sm sm:text-base">{skill}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="col-span-full text-center text-gray-500 py-8">
                              <Zap size={48} className="mx-auto mb-4 text-purple-400" />
                              <p className="text-lg font-semibold">Skills information coming soon!</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </AnimatedSection>
                  </div>
                </AnimatedSection>
              </div>
            )}

            {/* Curriculum Tab - Mobile Optimized */}
            {activeTab === 'curriculum' && (
              <div className="p-4 sm:p-6 lg:p-8 mb-16 sm:mb-20">
                <AnimatedSection delay={100}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 lg:mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <BookOpen className="text-white" size={20} />
                    </div>
                    <span className="text-center sm:text-left">Comprehensive Curriculum</span>
                  </h2>
                  
                  {program.curriculum ? (
                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                      {program.curriculum.map((module, idx) => (
                        <AnimatedSection key={idx} delay={200 + idx * 100}>
                          <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl sm:rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden group">
                            <div className="p-4 sm:p-6 lg:p-8">
                              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0 mx-auto sm:mx-0">
                                  {idx + 1}
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">{module.title}</h3>
                                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{module.description}</p>
                                  
                                  {module.topics && (
                                    <div>
                                      <h4 className="font-semibold text-slate-800 mb-3 sm:mb-4 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
                                        <Layers size={16} />
                                        Key Topics:
                                      </h4>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                                        {module.topics.map((topic, topicIdx) => (
                                          <div key={topicIdx} className="bg-white border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center sm:text-left hover:shadow-md hover:border-emerald-300 transition-all duration-300 hover:scale-105">
                                            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                              <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                              <span className="text-xs sm:text-sm text-gray-700 font-medium">{topic}</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16 lg:py-20">
                      <BookOpen size={64} className="mx-auto mb-6 text-emerald-400" />
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Curriculum Details Coming Soon!</h3>
                      <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">We're crafting a comprehensive curriculum that will be updated here shortly.</p>
                    </div>
                  )}
                </AnimatedSection>
              </div>
            )}

            {/* Placements Tab - Mobile Optimized */}
            {activeTab === 'placements' && (
              <div className="p-4 sm:p-6 lg:p-8 mb-16 sm:mb-20">
                <AnimatedSection delay={100}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 lg:mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <TrendingUp className="text-white" size={20} />
                    </div>
                    <span className="text-center sm:text-left">Placement Success</span>
                  </h2>

                  {/* Placement Stats - Mobile Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    <AnimatedSection delay={200}>
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <Trophy className="mx-auto mb-3 sm:mb-4" size={32} />
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                          <AnimatedCounter 
                            end={program.guaranteeDetails?.successRate ? parseFloat(program.guaranteeDetails.successRate) : 95} 
                            suffix="%" 
                          />
                        </div>
                        <div className="text-sm sm:text-base font-semibold opacity-90">Success Rate</div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={300}>
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <IndianRupee className="mx-auto mb-3 sm:mb-4" size={32} />
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">₹8.5L</div>
                        <div className="text-sm sm:text-base font-semibold opacity-90">Avg Package</div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={400}>
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <Building className="mx-auto mb-3 sm:mb-4" size={32} />
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">500+</div>
                        <div className="text-sm sm:text-base font-semibold opacity-90">Partner Companies</div>
                      </div>
                    </AnimatedSection>

                    <AnimatedSection delay={500}>
                      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                        <Briefcase className="mx-auto mb-3 sm:mb-4" size={32} />
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                          <AnimatedCounter end={program.students || 1500} suffix="+" />
                        </div>
                        <div className="text-sm sm:text-base font-semibold opacity-90">Placed Students</div>
                      </div>
                    </AnimatedSection>
                  </div>

                  {/* Placement Process - Mobile Steps */}
                  <AnimatedSection delay={600}>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 border border-blue-200">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">Our Placement Process</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                          { icon: BookOpen, title: "Skill Development", desc: "Master in-demand technologies" },
                          { icon: Target, title: "Portfolio Building", desc: "Create impressive projects" },
                          { icon: Users, title: "Interview Prep", desc: "Mock interviews & feedback" },
                          { icon: Trophy, title: "Job Placement", desc: "Land your dream job" }
                        ].map((step, idx) => (
                          <div key={idx} className="text-center">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                              <step.icon className="text-white" size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">{step.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Hiring Partners - Mobile Carousel Style */}
                  <AnimatedSection delay={700}>
                    <div className="mb-8 sm:mb-12">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-6 sm:mb-8 text-center">Our Hiring Partners</h3>
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                          {['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'IBM', 'Microsoft', 'Amazon', 'Google', 'Flipkart', 'Paytm', 'Zomato'].map((company, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:shadow-lg hover:bg-white border border-gray-100 transition-all duration-300 hover:scale-105">
                              <div className="font-bold text-slate-800 text-xs sm:text-sm">{company}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </AnimatedSection>
              </div>
            )}

            {/* Pricing Tab - Mobile Optimized */}
            {activeTab === 'pricing' && (
              <div className="pb-12 px-4 sm:p-8 lg:p-8 mb-16 sm:mb-20">
                <AnimatedSection delay={100}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 sm:mb-8 lg:mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                    ₹
                    </div>
                    <span className="text-center sm:text-left">Affordable Pricing for Everyone</span>
                  </h2>

                  {program.pricingPlans ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                      {program.pricingPlans.map((plan, idx) => (
                        <AnimatedSection key={idx} delay={200 + idx * 100}>
                          <div className={`relative bg-white rounded-2xl sm:rounded-3xl shadow-xl border-2 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                            plan.popular ? 'border-gradient-to-r from-purple-500 to-pink-500 border-purple-400' : 'border-gray-200'
                          }`}>
                            {plan.popular && (
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg border-2 border-white">
                                  <Star className="inline mr-1 sm:mr-2" size={14} />
                                  Most Popular
                                </div>
                              </div>
                            )}
                            
                            <div className="p-6 sm:p-8 lg:p-10">
                              <div className="text-center mb-6 sm:mb-8">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">{plan.name}</h3>
                                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 sm:mb-4">
                                  {plan.price}
                                  {plan.originalPrice && (
                                    <span className="text-lg sm:text-xl text-gray-400 line-through ml-2">{plan.originalPrice}</span>
                                  )}
                                </div>
                                <p className="text-sm sm:text-base text-gray-600">{plan.description}</p>
                              </div>

                              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {plan.features.map((feature, featureIdx) => (
                                  <div key={featureIdx} className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <Check className="text-white" size={12} />
                                    </div>
                                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                                  </div>
                                ))}
                              </div>

                              <button
                                onClick={() => handlePlanPayment(plan)}
                                disabled={loading}
                                className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                                  plan.popular 
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600'
                                }`}
                              >
                                {loading ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                  </div>
                                ) : (
                                  <>
                                    <Zap className="inline mr-2" size={18} />
                                    Enroll Now
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    /* Default Pricing Card */
                    <AnimatedSection delay={200}>
                      <div className="max-w-md mx-auto ">
                        <div className="relative bg-white rounded-2xl  sm:rounded-3xl shadow-xl border-2 border-blue-400 overflow-hidden">
                          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-gradient-to-r  from-blue-500 to-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg border-2 border-white">
                              <Star className="inline mr-1 sm:mr-2" size={14} />
                              Best Value
                            </div>
                          </div>
                          
                          <div className="p-6 sm:p-8 lg:p-10">
                            <div className="text-center my-10 sm:my-8">
                              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 sm:mb-4">Complete Program</h3>
                              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-2 sm:mb-4">
                                ₹19,999
                                <span className="text-lg sm:text-xl text-gray-400 line-through ml-2">₹49,999</span>
                              </div>
                              <p className="text-sm sm:text-base text-gray-600">Full access to the program with job guarantee</p>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                              {[
                                'Complete curriculum access',
                                'Live interactive sessions',
                                'Personal mentorship',
                                'Job placement assistance',
                                'Certificate of completion',
                                'Lifetime community access'
                              ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3 sm:gap-4">
                                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="text-white" size={12} />
                                  </div>
                                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{feature}</span>
                                </div>
                              ))}
                            </div>

                         
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  )}
                </AnimatedSection>
              </div>
            )}

            {/* Success Stories Tab - Mobile Optimized */}
            {activeTab === 'success' && (
              <div className="p-4 sm:p-6 lg:p-8 mb-16 sm:mb-20">
                <AnimatedSection delay={100}>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 lg:mb-12 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                      <Heart className="text-white" size={20} />
                    </div>
                    <span className="text-center sm:text-left">Success Stories</span>
                  </h2>

                  {program.successStories ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                      {program.successStories.map((story, idx) => (
                        <AnimatedSection key={idx} delay={200 + idx * 100}>
                          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                              <img 
                                src={story.image || '/api/placeholder/80/80'} 
                                alt={story.name}
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                              />
                              <div className="text-center sm:text-left">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1 sm:mb-2">{story.name}</h3>
                                <p className="text-sm sm:text-base text-blue-600 font-semibold mb-1">{story.role}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{story.company}</p>
                                <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 mt-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-amber-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <blockquote className="text-sm sm:text-base text-gray-700 italic leading-relaxed text-center sm:text-left">
                              "{story.testimonial}"
                            </blockquote>
                            {story.salary && (
                              <div className="mt-4 sm:mt-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-center font-bold text-sm sm:text-base">
                                <DollarSign className="inline mr-1 sm:mr-2" size={16} />
                                Package: {story.salary}
                              </div>
                            )}
                          </div>
                        </AnimatedSection>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16 lg:py-20">
                      <Heart size={64} className="mx-auto mb-6 text-red-400" />
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Amazing Success Stories Coming Soon!</h3>
                      <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">We're collecting inspiring stories from our successful graduates.</p>
                    </div>
                  )}
                </AnimatedSection>
              </div>
            )}
          </div>

         
{/* FAQ Section - Premium Dark Design */}
<AnimatedSection delay={800}>
  <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-6 mb-52 lg:mb-28 sm:p-12 rounded-3xl border border-gray-700/50  shadow-2xl">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30">
              <HelpCircle className="h-8 w-8 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about the program. Can't find the answer you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-700/50 shadow-xl">
          <div className="space-y-6">
            {program.faqs.map((faq, index) => (
              <FaqItem 
                key={index} 
                faq={faq} 
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Additional Support CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-6">Get in touch with our admissions team for personalized guidance</p>
            <Link to="/contactCodeEternity" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</AnimatedSection>

          {/* Fixed Bottom CTA - Mobile Optimized */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-3  sm:p-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">Ready to Start Your Journey?</div>
                <div className="text-xs sm:text-sm text-gray-600">Join thousands who have transformed their careers</div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600">₹19,999</div>
                {user ? 
                <button
                onClick={handlePaymentClick}
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
              >
               {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Zap className="inline mr-2" size={18} />
                    Enroll Now
                  </>
                )}
              </button>
                :
                <Link
                to="/login" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
              >
                 <div className="flex items-center justify-center gap-2">
                Log in to Enroll<ArrowRight className="inline mr-2" size={18} />
              </div>

                </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(3rem);
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
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes pulse-slower {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
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

        .animate-slide-up {
          animation: slide-up 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-float {
            animation: float 2s ease-in-out infinite;
          }
        }

        /* Responsive text scaling */
        @media (max-width: 480px) {
          .text-responsive {
            font-size: 0.875rem;
          }
        }

        /* Smooth scrolling for mobile */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbars on mobile for cleaner look */
        @media (max-width: 640px) {
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        }

        /* Enhanced focus states for accessibility */
        button:focus-visible,
        .tab-button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Improved touch targets for mobile */
        @media (max-width: 640px) {
          button,
          .clickable {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Gradient text effect */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card hover effects */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
        }

        /* Mobile-optimized shadows */
        @media (max-width: 640px) {
          .shadow-xl {
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          
          .shadow-2xl {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        }

        /* Loading spinner animation */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Improved button press effect on mobile */
        @media (max-width: 640px) {
          button:active {
            transform: scale(0.95);
            transition: transform 0.1s;
          }
        }

        /* Better spacing for mobile readability */
        @media (max-width: 640px) {
          .leading-relaxed {
            line-height: 1.75;
          }
        }

        /* Optimized border radius for mobile */
        @media (max-width: 640px) {
          .rounded-3xl {
            border-radius: 1.5rem;
          }
          
          .rounded-2xl {
            border-radius: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PlacementProgramCourseDetails;