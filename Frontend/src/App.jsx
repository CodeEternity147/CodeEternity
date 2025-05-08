import './App.css'; // Import your CSS file
import './index.css'; // Import Tailwind CSS

import React from 'react';
import { Route, Routes } from "react-router-dom";

import DeelSection from './componants/Home/DeelSection';
import Information from './componants/Home/Information';
import IntegrationsSection from './componants/Home/IntegrationsSection';
import StartupHero from './componants/Home/StartupHero';
import WhyJoinCodeEternity from './componants/Home/whyJoin';
import Header from './componants/Navbar/Header';
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
              <Information />
              <IntegrationsSection />
              <DeelSection />
            </MainLayout>
          } />

          {/* Route for ContactUs page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Route for Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route for Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

