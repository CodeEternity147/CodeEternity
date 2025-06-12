import { useState, useEffect } from "react";

export default function InternshipPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Simplified Backdrop */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-gray-900/90 via-black/80 to-blue-900/90 backdrop-blur-md z-[100] transition-all duration-700 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      >
        {/* Minimal Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce opacity-50"></div>
          <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse opacity-60"></div>
        </div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:100px_100px] animate-pulse"></div>
        </div>
      </div>
      
      {/* Popup Container */}
      <div className={`fixed inset-0 flex items-center justify-center z-[101] p-2 transition-all duration-700 ${
        isAnimating ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-3'
      }`}>
        
        {/* Main Popup */}
        <div className="relative w-full max-w-4xl h-[95vh] mx-2 overflow-hidden transform transition-all duration-500 hover:scale-105 rounded-3xl">
          
          {/* Subtle Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-3xl animate-pulse opacity-75 blur-sm"></div>
          
          {/* Main Content Container */}
          <div className="relative h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl border border-gray-700/50 overflow-hidden flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-gray-800/80 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-600 hover:border-red-400 group hover:rotate-90"
            >
              <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Section - Dark Theme */}
            <div className="relative px-8 py-6 overflow-hidden flex-shrink-0">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-800/20 animate-pulse"></div>
              
              {/* Floating Infinity Pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg viewBox="0 0 240 140" className="w-full h-full animate-spin" style={{animationDuration: '20s'}}>
                  <path
                    d="M60,70 C60,30 100,30 115,70 C100,110 60,110 60,70 M180,70 C180,30 140,30 125,70 C140,110 180,110 180,70"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#1D4ED8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              <div className="relative z-10">
                {/* Status Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-300 animate-pulse">Live Enrollment</span>
                  </div>
                  <div className="px-4 py-2 bg-orange-500/20 rounded-full border border-orange-500/30">
                    <span className="text-sm text-orange-300 font-mono animate-pulse">12 SEATS LEFT</span>
                  </div>
                </div>
                
                <h2 className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-pulse">
                  CodeEternity
                </h2>
                <p className="text-gray-300 text-xl">Transform your coding journey into infinity</p>
              </div>
            </div>

            {/* Content Section - Light Theme */}
            <div className="bg-gradient-to-br from-white to-gray-50 p-6 space-y-4 flex-1 min-h-0">
              
              {/* Benefits Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Unlock Your Potential</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  {[
                    { icon: "🚀", title: "Live Project Experience", desc: "Build real applications that matter", color: "from-purple-600 to-purple-800" },
                    { icon: "👨‍💻", title: "Expert Mentorship", desc: "Learn from industry veterans", color: "from-purple-600 to-purple-800" },
                    { icon: "🏆", title: "Certificate & Portfolio", desc: "Showcase your achievements", color: "from-gray-700 to-gray-900" }
                  ].map((item, index) => (
                    <div key={index} className={`group p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white transform transition-all duration-300 hover:scale-105 hover:rotate-1 animate-pulse`} style={{animationDelay: `${index * 200}ms`}}>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl animate-bounce" style={{animationDelay: `${index * 100}ms`}}>{item.icon}</div>
                        <div>
                          <p className="font-semibold text-base">{item.title}</p>
                          <p className="text-sm opacity-90">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two Column Layout for Stats and Urgency */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Animated Stats */}
                <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-5 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 animate-pulse"></div>
                  <div className="relative z-10">
                    <h4 className="text-center text-lg font-semibold mb-3 text-blue-200">Success Stories</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[
                        { num: "500+", label: "Placed", color: "text-blue-400" },
                        { num: "50+", label: "Projects", color: "text-blue-300" },
                        { num: "98%", label: "Success", color: "text-gray-300" }
                      ].map((stat, index) => (
                        <div key={index} className="transform transition-all duration-300 hover:scale-110">
                          <div className={`text-2xl font-bold ${stat.color} animate-pulse`} style={{animationDelay: `${index * 300}ms`}}>
                            {stat.num}
                          </div>
                          <div className="text-xs text-gray-300">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Urgency Banner */}
                <div className="relative bg-gradient-to-r from-gray-800 to-black rounded-2xl p-5 text-white overflow-hidden flex items-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-spin flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm">⚡ Flash Enrollment Ending Soon!</p>
                      <p className="text-xs opacity-90">Join 1000+ students who transformed their careers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="space-y-3">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfdLjTgj3g04X3bb-oZM04FiFQVnDRdC87CsfMFznCcpDH96g/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full bg-gradient-to-r from-purple-700 to-purple-800 text-white py-4 px-8 rounded-2xl font-bold text-xl text-center inline-flex items-center justify-center gap-3 transition-all duration-500 transform hover:scale-105 hover:rotate-1 shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10">🚀 Secure Your Future - FREE</span>
                  <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                
                {/* Secondary CTA */}
                <div className="text-center">
                  <button 
                    onClick={handleClose}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300 underline"
                  >
                    I'll think about it
                  </button>
                </div>
              </div>
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 animate-pulse" style={{animationDelay: `${i * 100}ms`}} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">4.9/5</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-sm text-gray-600 font-medium">💯 Verified Reviews</div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-sm text-gray-600">🔒 Secure & Trusted</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}