import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppChat = ({ showInMainLayout = false }) => {
  // If not in MainLayout, don't render anything
  if (!showInMainLayout) {
    return null;
  }

  const phoneNumber = '918874700800';
  const message = 'Hello! I have a question about CodeEternity.';

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="relative">
                 {/* Simple animated ring */}
         <div className="absolute inset-0 -m-2">
           <div className="absolute inset-0 bg-[#25D366] rounded-full opacity-30 animate-ping"></div>
         </div>

         {/* Main button with simplified effects */}
         <button
           onClick={handleWhatsAppClick}
           className="relative bg-[#25D366] text-white p-4 rounded-full 
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 transform hover:scale-110
                    flex items-center justify-center border-2 border-white/20
                    hover:border-white/40 active:scale-105"
           aria-label="Chat on WhatsApp"
         >
          {/* Simple hover effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 
                        transition-opacity duration-300 rounded-full"></div>
          
          {/* Icon */}
          <FaWhatsapp className="text-3xl relative z-10" />
          
          {/* Simple notification dot */}
          <div className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full 
                        border-2 border-white animate-pulse"></div>
        </button>
      </div>
    </div>
  );
};

export default WhatsAppChat;