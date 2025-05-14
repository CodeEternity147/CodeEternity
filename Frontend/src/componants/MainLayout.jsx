import React, { useState } from 'react';
import Header from './Navbar/Header';
import WhatWeoffer from './Navbar/WhatWeoffer';
import WhoWeServe from './Navbar/WhoWeServe';
import TransparentBox from './TransparentBox';
import Footer from './Footer';
import ChatBot from './ChatBot';


const MainLayout = ({ children, showFooter = true ,showtransparentbox = true , showHeader = true}) => {

  return (
    <div className="relative z-10 bg-[#fffaf4]">
      {/* Header */}
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>
      )}

      {/* Navigation Bar */}


      {/* Page Content */}
      {children}

      {/* Fixed Transparent Box */}
      {showtransparentbox && (
        <div className="hidden md:block fixed top-5/8 left-20 transform -translate-y-1/2 z-50">
        <TransparentBox />
      </div>
      )}

      <div className='fixed top-1/2'>
        <ChatBot />
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;