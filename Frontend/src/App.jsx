import './App.css'; // Import your CSS file
import './index.css'; // Import Tailwind CSS

import React from 'react';
import { Route, Routes } from "react-router-dom";

import DealSection from './componants/Home/DealSection';
import InformationSection from './componants/Home/InformationSection';
import IntegrationsSection from './componants/Home/IntegrationsSection';
import StartupHero from './componants/Home/StartupHero';
import WhyJoinCodeEternity from './componants/Home/WhyJoinCodeEternity';
import MainLayout from './componants/MainLayout';
import LoginPage from './componants/Pages/LoginPage';
import Signup from './componants/Pages/Signup';
import Dashboard from './componants/Dashboard';
import ProtectedRoute from './componants/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import TeamPaymentFeatures from './componants/Home/TeamPaymentFeatures';
import ContactPage from './componants/Pages/ContactPage';
import ErrorBoundary from './componants/ErrorBoundary';
import NotFound from './componants/NotFound';
import WhatWeOffer from './componants/Pages/WhatWeOffer';
import CareerPage from './componants/Pages/CareerPage ';
import WhoWeOfferPage from './componants/Pages/WhoWeOfferPage';
function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <StartupHero />
              <TeamPaymentFeatures />
              <WhyJoinCodeEternity />
              <InformationSection />
              <IntegrationsSection />
              <DealSection />
            </MainLayout>
          } />

          {/* Route for ContactUs page */}
          <Route path="/contactCodeEternity" element={
            <MainLayout showFooter={false} showtransparentbox={false} >
              <ContactPage />
            </MainLayout>
          } />

          {/* Route for Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route for Dashboard */}
          <Route 
            path="/dashboard" 
            element={
             <MainLayout showFooter={false} >
               <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
             </MainLayout>
            } 
          />

          {/* Route for WhatWeOffer page */}
          <Route path="/whatweoffer" element={
            <MainLayout showFooter={false} showtransparentbox={false} >
              <WhatWeOffer />
            </MainLayout>
          } />
          <Route path="/whoweServe" element={
            <MainLayout showFooter={false} showtransparentbox={false} >
              <WhoWeOfferPage />
            </MainLayout>
          } />

          <Route path="/career" element={
            <MainLayout showFooter={false} showtransparentbox={false} >
              <CareerPage />
            </MainLayout>
          } />


          {/* 404 Route - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

