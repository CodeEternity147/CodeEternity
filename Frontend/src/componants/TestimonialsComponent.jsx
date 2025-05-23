import React, { useState, useEffect } from 'react';
import { User, Briefcase, Award, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonialData = [
  {
    id: 1,
    name: "Nikhil Mehta",
    position: "Senior Developer at TechCorp",
    content: "Code Eternity transformed my career trajectory. Their advanced courses helped me master complex technologies that led to a promotion within months.",
    type: "placement",
    icon: <User />,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarita Desai",
    position: "CTO at Innovate Solutions",
    content: "As a client, I've hired multiple Code Eternity graduates. Their technical knowledge and problem-solving abilities are consistently impressive.",
    type: "client",
    icon: <Briefcase />,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Rahul Sharma",
    position: "Full Stack Developer at Infosys",
    content: "Code Eternity's advanced JavaScript course gave me the skills to clear difficult technical interviews. I now work at one of India's top IT companies.",
    type: "placement",
    icon: <User />,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Neha Gupta",
    position: "Frontend Developer at Wipro",
    content: "From a commerce background to a tech professional in just 6 months. The structured curriculum and project-based learning approach made all the difference.",
    type: "success",
    icon: <Award />,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Anjali Rao",
    position: "Bangalore-based Startup",
    content: "As a growing startup, we've hired multiple Code Eternity graduates. Their practical knowledge and ability to implement real-world solutions has been outstanding.",
    type: "client",
    icon: <Briefcase />,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Amit Patel",
    position: "Backend Developer at Amazon",
    content: "The DSA bootcamp prepared me for the toughest coding interviews. I cracked Amazon's interview process on my first attempt!",
    type: "placement",
    icon: <User />,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Meera Singh",
    position: "Full Stack Developer",
    content: "The React masterclass was incredibly comprehensive. I went from beginner to building production-ready applications in just 8 weeks!",
    type: "success",
    icon: <Award />,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Priya Verma",
    position: "UI/UX Designer & Developer",
    content: "Learning both design principles and React implementation helped me create a unique portfolio that stands out. Now I work remotely for international clients.",
    type: "success",
    icon: <Star />,
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 9,
    name: "Ravi Kumar",
    position: "Data Scientist at Flipkart",
    content: "The Python and Data Science course was exceptional. The hands-on projects with real datasets prepared me perfectly for my role at Flipkart.",
    type: "placement",
    icon: <User />,
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 10,
    name: "Shivani Sharma",
    position: "Digital Agency in Mumbai",
    content: "We've partnered with Code Eternity for our team's upskilling needs. The custom training programs have significantly improved our development workflow.",
    type: "client",
    icon: <Briefcase />,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialsComponent = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const filteredTestimonials = activeFilter === "all" 
    ? testimonialData 
    : testimonialData.filter(t => t.type === activeFilter);
  
  const testimonialsPerPage = 3;
  const pageCount = Math.ceil(filteredTestimonials.length / testimonialsPerPage);
  
  const getCurrentTestimonials = () => {
    const start = currentPage * testimonialsPerPage;
    const end = start + testimonialsPerPage;
    return filteredTestimonials.slice(start, end);
  };
  
  const handlePageChange = (newPage) => {
    if (isAnimating || newPage === currentPage) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsAnimating(false);
    }, 300);
  };
  
  const handleNextPage = () => {
    const nextPage = currentPage === pageCount - 1 ? 0 : currentPage + 1;
    handlePageChange(nextPage);
  };
  
  const handlePrevPage = () => {
    const prevPage = currentPage === 0 ? pageCount - 1 : currentPage - 1;
    handlePageChange(prevPage);
  };
  
  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && !hoveredCard) {
        handleNextPage();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentPage, filteredTestimonials.length, isAnimating, hoveredCard]);

  const getTypeStyles = (type) => {
    switch (type) {
      case 'placement':
        return {
          gradient: 'from-blue-400 to-cyan-400',
          accent: 'bg-blue-50 border-blue-100',
          tag: 'bg-blue-100 text-blue-700'
        };
      case 'client':
        return {
          gradient: 'from-emerald-400 to-teal-400',
          accent: 'bg-emerald-50 border-emerald-100',
          tag: 'bg-emerald-100 text-emerald-700'
        };
      case 'success':
        return {
          gradient: 'from-violet-400 to-purple-400',
          accent: 'bg-violet-50 border-violet-100',
          tag: 'bg-violet-100 text-violet-700'
        };
      default:
        return {
          gradient: 'from-gray-400 to-slate-400',
          accent: 'bg-gray-50 border-gray-100',
          tag: 'bg-gray-100 text-gray-700'
        };
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'placement': return 'Career Success';
      case 'client': return 'Client Review';
      case 'success': return 'Achievement';
      default: return 'Story';
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className="text-amber-400 fill-current"
      />
    ));
  };

  const filterButtons = [
    { key: "all", label: "All Stories", icon: "🌟" },
    { key: "placement", label: "Placements", icon: "💼" },
    { key: "client", label: "Clients", icon: "🏢" },
    { key: "success", label: "Success", icon: "🎯" }
  ];
  
  return (
    <section className="relative min-h-screen bg-[#fffbf4]  py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 mb-6">
            <Star className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-600">Success Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-violet-800 bg-clip-text text-transparent leading-tight">
            Transforming Careers,
            <br />
            <span className="text-3xl md:text-5xl">One Story at a Time</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Code Eternity has empowered thousands of students and professionals 
            to achieve their dream careers in technology.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterButtons.map(({ key, label, icon }) => (
            <button 
              key={key}
              onClick={() => setActiveFilter(key)} 
              className={`group relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === key 
                  ? "bg-gradient-to-r from-blue-700 to-violet-700  text-white "  
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
              {activeFilter === key && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-500 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Testimonials Grid */}
        {filteredTestimonials.length > 0 ? (
          <div className="relative">
            <div 
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {getCurrentTestimonials().map((testimonial, index) => {
                const styles = getTypeStyles(testimonial.type);
                return (
                  <div 
                    key={testimonial.id} 
                    className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${styles.accent}`}
                    onMouseEnter={() => setHoveredCard(testimonial.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Animated gradient border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${styles.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Type Badge */}
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium mb-6 ${styles.tag}`}>
                        {testimonial.icon}
                        <span className="ml-1">{getTypeLabel(testimonial.type)}</span>
                      </div>

                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6">
                        <Quote className="w-8 h-8 text-gray-300 group-hover:text-gray-400 transition-colors" />
                      </div>
                      
                      {/* Testimonial Content */}
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 min-h-[120px]">
                        "{testimonial.content}"
                      </blockquote>
                      
                      {/* Author Section */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${styles.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                            <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-white">
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full rounded-2xl object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className={`w-full h-full rounded-2xl bg-gradient-to-r ${styles.gradient} items-center justify-center text-white hidden`}>
                                {testimonial.icon}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-gray-600 font-medium text-sm truncate">
                            {testimonial.position}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            {renderStars()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Navigation */}
            {pageCount > 1 && (
              <div className="flex items-center justify-center mt-12 gap-6">
                <button 
                  onClick={handlePrevPage}
                  disabled={isAnimating}
                  className="group p-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: pageCount }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index)}
                      disabled={isAnimating}
                      className={`transition-all duration-300 rounded-full ${
                        currentPage === index 
                          ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-violet-600' 
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={handleNextPage}
                  disabled={isAnimating}
                  className="group p-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No testimonials found</h3>
            <p className="text-gray-600 text-lg">No testimonials available for this category.</p>
          </div>
        )}
        
        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-2xl px-8 py-4">
            <Star className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700 font-medium">
              Join <span className="font-bold text-blue-600">10,000+</span> successful graduates
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsComponent;