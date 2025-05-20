import React, { useState, useEffect } from 'react';
import { User, Briefcase, Award, ArrowRight, ArrowLeft, Star, ChevronRight, ChevronLeft } from 'lucide-react';

const testimonialData = [
  {
    id: 1,
    name: "Nikhil Mehta",
    position: "Senior Developer at TechCorp",
    content: "Code Eternity transformed my career trajectory. Their advanced courses helped me master complex technologies that led to a promotion within months.",
    type: "placement",
    icon: <User />
  },
  {
    id: 2,
    name: "Sarita Desai",
    position: "CTO at Innovate Solutions",
    content: "As a client, I've hired multiple Code Eternity graduates. Their technical knowledge and problem-solving abilities are consistently impressive.",
    type: "client",
    icon: <Briefcase />
  },
  {
    id: 3,
    name: "Rahul Sharma",
    position: "Full Stack Developer at Infosys",
    content: "Code Eternity's advanced JavaScript course gave me the skills to clear difficult technical interviews. I now work at one of India's top IT companies.",
    type: "placement",
    icon: <User />
  },
  {
    id: 4,
    name: "Neha Gupta",
    position: "Frontend Developer at Wipro",
    content: "From a commerce background to a tech professional in just 6 months. The structured curriculum and project-based learning approach made all the difference.",
    type: "success",
    icon: <Award />
  },
  {
    id: 5,
    name: "Anjali Rao",
    position: "Bangalore-based Startup",
    content: "As a growing startup, we've hired multiple Code Eternity graduates. Their practical knowledge and ability to implement real-world solutions has been outstanding.",
    type: "client",
    icon: <Briefcase />
  },
  {
    id: 6,
    name: "Amit Patel",
    position: "Backend Developer at Amazon",
    content: "The DSA bootcamp prepared me for the toughest coding interviews. I cracked Amazon's interview process on my first attempt!",
    type: "placement",
    icon: <User />
  },
  {
    id: 7,
    name: "Meera Singh",
    position: "Full Stack Developer",
    content: "The React masterclass was incredibly comprehensive. I went from beginner to building production-ready applications in just 8 weeks!",
    type: "success",
    icon: <Award />
  },
  {
    id: 8,
    name: "Priya Verma",
    position: "UI/UX Designer & Developer",
    content: "Learning both design principles and React implementation helped me create a unique portfolio that stands out. Now I work remotely for international clients.",
    type: "success",
    icon: <Star />
  },
  {
    id: 9,
    name: "Ravi Kumar",
    position: "Data Scientist at Flipkart",
    content: "The Python and Data Science course was exceptional. The hands-on projects with real datasets prepared me perfectly for my role at Flipkart.",
    type: "placement",
    icon: <User />
  },
  {
    id: 10,
    name: "shivani Sharma",
    position: "Digital Agency in Mumbai",
    content: "We've partnered with Code Eternity for our team's upskilling needs. The custom training programs have significantly improved our development workflow.",
    type: "client",
    icon: <Briefcase />
  }
];

const TestimonialsComponent = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [animation, setAnimation] = useState('');
  
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
  
  const handleNextPage = () => {
    setAnimation('slideLeft');
    setTimeout(() => {
      setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
      setAnimation('');
    }, 300);
  };
  
  const handlePrevPage = () => {
    setAnimation('slideRight');
    setTimeout(() => {
      setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
      setAnimation('');
    }, 300);
  };
  
  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextPage();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentPage, filteredTestimonials.length]);
  
  const renderPageDots = () => {
    return Array.from({ length: pageCount }).map((_, index) => (
      <button
        key={index}
        onClick={() => {
          setAnimation(index > currentPage ? 'slideLeft' : 'slideRight');
          setTimeout(() => {
            setCurrentPage(index);
            setAnimation('');
          }, 300);
        }}
        className={`w-2 h-2 md:w-3 md:h-3 mx-1 rounded-full transition-all duration-300 ${
          currentPage === index ? 'bg-blue-600 w-4 md:w-6' : 'bg-gray-300 hover:bg-gray-400'
        }`}
        aria-label={`Go to page ${index + 1}`}
      />
    ));
  };

  const renderStars = (count = 5) => {
    return Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={16} fill="currentColor" />
    ));
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-200 to-indigo-300 py-20 md:py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/5 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Success Stories</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Hear from our graduates, clients, and partners about their transformative experiences with Code Eternity.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center mb-12 space-x-2 md:space-x-4">
          <button 
            onClick={() => setActiveFilter("all")} 
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 font-medium ${
              activeFilter === "all" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow"
            }`}
          >
            All Stories
          </button>
          <button 
            onClick={() => setActiveFilter("placement")} 
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 font-medium ${
              activeFilter === "placement" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow"
            }`}
          >
            Placements
          </button>
          <button 
            onClick={() => setActiveFilter("client")} 
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 font-medium ${
              activeFilter === "client" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow"
            }`}
          >
            Clients
          </button>
          <button 
            onClick={() => setActiveFilter("success")} 
            className={`px-6 py-2 rounded-full transition-all duration-300 mb-2 font-medium ${
              activeFilter === "success" 
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" 
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:shadow"
            }`}
          >
            Success Stories
          </button>
        </div>
        
        {filteredTestimonials.length > 0 ? (
          <div className="relative">
            <div 
              className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300 ${
                animation === 'slideLeft' ? 'opacity-0 transform -translate-x-8' : 
                animation === 'slideRight' ? 'opacity-0 transform translate-x-8' : 
                'opacity-100 transform translate-x-0'
              }`}
            >
              {getCurrentTestimonials().map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                  <div className={`h-2 w-full ${
                    testimonial.type === 'placement' ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 
                    testimonial.type === 'client' ? 'bg-gradient-to-r from-emerald-500 to-emerald-700' : 
                    'bg-gradient-to-r from-indigo-500 to-purple-600'
                  }`}></div>
                  
                  <div className="p-6 md:p-8">
                    <div className="flex justify-center mb-6">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg ${
                        testimonial.type === 'placement' ? 'bg-gradient-to-r from-blue-500 to-blue-700' : 
                        testimonial.type === 'client' ? 'bg-gradient-to-r from-emerald-500 to-emerald-700' : 
                        'bg-gradient-to-r from-indigo-500 to-purple-600'
                      }`}>
                        {testimonial.icon}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-gray-700 text-lg mb-6 italic line-clamp-4 h-28">"{testimonial.content}"</p>
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{testimonial.name}</h4>
                        <p className="text-gray-600 font-medium">{testimonial.position}</p>
                      </div>
                      
                      <div className="flex justify-center mt-4 text-yellow-400">
                        {renderStars()}
                      </div>
                    </div>
                    
                    <div className="absolute top-6 right-6 text-5xl font-serif text-indigo-300 opacity-20">"</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8 px-4">
              <button 
                onClick={handlePrevPage}
                className="group bg-white hover:bg-gradient-to-r from-blue-500 to-indigo-600 text-blue-500 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-blue-300 shadow-md"
                aria-label="Previous page"
              >
                <ChevronLeft size={24} className="group-hover:animate-pulse" />
              </button>
              
              <div className="flex items-center space-x-1 md:space-x-2">
                {renderPageDots()}
              </div>
              
              <button 
                onClick={handleNextPage}
                className="group bg-white hover:bg-gradient-to-r from-blue-500 to-indigo-600 text-blue-500 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-blue-300 shadow-md"
                aria-label="Next page"
              >
                <ChevronRight size={24} className="group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No testimonials found</h3>
            <p className="text-gray-500">No testimonials available for this category.</p>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TestimonialsComponent;