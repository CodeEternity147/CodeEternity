import React, { useState } from 'react';
import Header from './Navbar/Header';
import WhatWeoffer from './Navbar/WhatWeoffer';
import WhoWeServe from './Navbar/WhoWeServe';
import TransparentBox from './TransparentBox';
import Footer from './Footer';

const MainLayout = ({ children, showFooter = true }) => {

  return (
    <div className="relative z-10 bg-[#fffaf4]">
      <Header/>


      {/* Page Content */}
      {children}

      {/* Fixed Transparent Box */}
      <div className="hidden md:block fixed top-5/8 right-20 transform -translate-y-1/2 z-50">
        <TransparentBox />
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;