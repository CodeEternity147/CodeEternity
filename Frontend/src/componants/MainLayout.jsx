import React, { useState } from 'react';
import Header from './Navbar/Header';
import WhatWeoffer from './Navbar/WhatWeoffer';
import WhoWeServe from './Navbar/WhoWeServe';
import TransparentBox from './TransparentBox';
import Footer from './Footer';
import ChatBot from './ChatBot';

const MainLayout = ({ children, showFooter = true, showtransparentbox = true, showHeader = true }) => {
  return (
    <div className="relative z-10 bg-[#fffaf4]">
      {/* Header */}
      {showHeader && (
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <Header />
        </div>
      )}

      {/* Page Content */}
      {children}

      {/* Fixed Transparent Box */}
      {showtransparentbox && <TransparentBox />}

      <div className='fixed bottom-4 right-4 z-[90]'>
        <ChatBot />
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;