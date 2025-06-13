import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const WhatsAppChat = ({ showInMainLayout = false }) => {
  // If not in MainLayout, don't render anything
  if (!showInMainLayout) {
    return null;
  }

  const phoneNumber = '918874700800';
  const message = 'Hello! I have a question about CodeEternity.';
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show popup automatically after 3 seconds if user hasn't interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setHasInteracted(true);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setHasInteracted(true);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative group">
        {/* Multiple Animated rings with different sizes and delays */}
        <div className="absolute inset-0 -m-4">
          <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-30 animate-ping"></div>
          <div className="absolute inset-2 bg-[#34eb7a] rounded-full opacity-20 animate-ping animation-delay-300"></div>
          <div className="absolute inset-4 bg-[#128C7E] rounded-full opacity-15 animate-ping animation-delay-600"></div>
        </div>

        {/* Enhanced gradient background with rotation */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#25D366] via-[#34eb7a] via-[#20c997] to-[#128C7E] 
                      rounded-full opacity-75 group-hover:opacity-100 blur-sm animate-gradient-rotate"></div>
        
        {/* Floating particles effect */}
        <div className="absolute -inset-8 pointer-events-none">
          <div className="absolute top-2 left-8 w-1 h-1 bg-[#25D366] rounded-full animate-float-1"></div>
          <div className="absolute bottom-4 right-2 w-1.5 h-1.5 bg-[#34eb7a] rounded-full animate-float-2"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-[#128C7E] rounded-full animate-float-3"></div>
        </div>
        
        {/* Enhanced Popup Message with bounce effect */}
        {showPopup && (
          <div className="absolute left-16 bottom-0 animate-bounce-in-left">
            <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-3 min-w-[240px] 
                          border border-gray-100 transform transition-all duration-500 hover:scale-105
                          backdrop-blur-sm bg-white/95">
              {/* Decorative glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#25D366]/20 to-[#128C7E]/20 
                            rounded-xl blur-lg opacity-75"></div>
              
              {/* Close button with hover effect */}
              <button 
                onClick={closePopup}
                className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 
                         text-white rounded-full p-1 transition-all duration-200 transform hover:scale-110 shadow-lg"
              >
                <IoClose className="text-xs" />
              </button>
              
              {/* Message content with enhanced styling */}
              <div className="flex items-center space-x-3 relative z-10">
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#25D366] to-[#128C7E] 
                                rounded-full flex items-center justify-center shadow-lg
                                animate-pulse-gentle">
                    <FaWhatsapp className="text-white text-base drop-shadow-sm" />
                  </div>
                  {/* Mini notification dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 
                                rounded-full animate-bounce border-2 border-white flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">!</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-800 font-bold text-sm mb-0.5">Need help? 🤝</p>
                  <p className="text-gray-600 text-xs leading-relaxed">Chat with us on WhatsApp!</p>
                  <p className="text-[#25D366] text-[10px] font-semibold mt-0.5">✨ Quick response guaranteed</p>
                </div>
              </div>
              
              {/* Enhanced arrow with glow */}
              <div className="absolute -left-2 bottom-4">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent
                              border-r-[12px] border-r-white
                              border-b-[8px] border-b-transparent filter drop-shadow-lg"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main button with enhanced effects */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => !hasInteracted && setShowPopup(true)}
          onMouseLeave={() => !hasInteracted && setShowPopup(false)}
          className="relative bg-gradient-to-br from-[#25D366] via-[#20c997] to-[#128C7E] text-white p-4 rounded-full 
                   shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_48px_rgba(37,211,102,0.6)]
                   transition-all duration-500 transform hover:scale-110 hover:rotate-[360deg]
                   flex items-center justify-center border-2 border-white/40
                   hover:border-white/70 active:scale-105 overflow-hidden group
                   animate-float-gentle"
          aria-label="Chat on WhatsApp"
        >
          {/* Multi-layer glow effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#34eb7a]/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Shine sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 ease-out"></div>
          
          {/* Icon with enhanced shadow */}
          <FaWhatsapp className="text-3xl drop-shadow-2xl relative z-10 
                               group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]
                               transition-all duration-300" />
          
          {/* Enhanced notification dot with pulse */}
          <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-red-500 rounded-full 
                        animate-pulse-strong border-2 border-white shadow-lg">
            <div className="absolute inset-0 bg-red-300 rounded-full animate-ping opacity-75"></div>
          </div>
        </button>

        
      </div>
      
      <style jsx>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes bounce-in-left {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateX(5px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
          50% { transform: translateY(-15px) rotate(-180deg); opacity: 1; }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        
        @keyframes pulse-strong {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        .animate-gradient-rotate {
          animation: gradient-rotate 8s linear infinite;
        }
        
        .animate-bounce-in-left {
          animation: bounce-in-left 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-float-1 {
          animation: float-1 4s ease-in-out infinite;
        }
        
        .animate-float-2 {
          animation: float-2 3s ease-in-out infinite;
        }
        
        .animate-float-3 {
          animation: float-3 5s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-strong {
          animation: pulse-strong 1s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  );
};

export default WhatsAppChat;