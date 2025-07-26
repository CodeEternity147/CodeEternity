import "./App.css"; 
import "./index.css"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseDetailModal from "./componants/CourseDetailModal ";
import DealSection from "./componants/Home/DealSection";
import InformationSection from "./componants/Home/InformationSection";
import IntegrationsSection from "./componants/Home/IntegrationsSection";
import StartupHero from "./componants/Home/StartupHero";
import WhyJoinCodeEternity from "./componants/Home/WhyJoinCodeEternity";
import MainLayout from "./componants/MainLayout";
import LoginPage from "./componants/Pages/LoginPage";
import Signup from "./componants/Pages/Signup";
import Dashboard from "./componants/Dashboard";
import ProtectedRoute from "./componants/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import TeamPaymentFeatures from "./componants/Home/TeamPaymentFeatures";
import ContactPage from "./componants/Pages/ContactPage";
import ErrorBoundary from "./componants/ErrorBoundary";
import NotFound from "./componants/NotFound";
import WhatWeOffer from "./componants/Pages/WhatWeOffer";
import CareerPage from "./componants/Pages/CareerPage ";
import WhoWeOfferPage from "./componants/Pages/WhoWeOfferPage";
import LMSPage from "./componants/Pages/LMSPage";
import TestimonialsComponent from "./componants/TestimonialsComponent";
import PrivacyPolicy from "./componants/PrivacyPolicy";
import TermsAndConditions from "./componants/TermsAndConditions";
import ReturnPolicy from "./componants/ReturnPolicy";
import WhatsAppChat from "./componants/WhatsAppChat";
import PaymentOption from "./componants/Core/PaymentOption";
import PaymentSuccess from "./componants/Pages/PaymentSuccess";
import PaymentFailure from "./componants/Pages/PaymentFailure";
import ForgotPassword from './componants/Pages/ForgotPassword';
import ResetPassword from './componants/Pages/ResetPassword';
import VerifyOTP from './componants/Pages/VerifyOTP';
import SetNewPassword from './componants/Pages/SetNewPassword';
import PaymentHistory from './componants/PaymentHistory';
import PlacementProgramCourseDetails from "./componants/Pages/PlacementProgramCourseDetails";
import ServiceForm from "./componants/Pages/ServiceForm"; 

function App() {
  const [selectedChildCourse, setSelectedChildCourse] = useState(null);
  const navigate = useNavigate();

  const handleCourseSelect = (course) => {
    // console.log('Course selected in App:', course); // Debug log
    if (!course) {
              // console.log('No course provided to handleCourseSelect'); // Debug log
      return;
    }
    setSelectedChildCourse(course);
  };

  // Effect to handle course selection changes
  useEffect(() => {
    if (selectedChildCourse) {
      // console.log('Selected course changed:', selectedChildCourse); // Debug log
    }
  }, [selectedChildCourse]);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <StartupHero />
                <TeamPaymentFeatures />
                <WhyJoinCodeEternity />
                <InformationSection />
                <IntegrationsSection />
                <TestimonialsComponent />
                <DealSection />
              </MainLayout>
            }
          />

          {/* Route for ContactUs page */}
          <Route
            path="/contactCodeEternity"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <ContactPage />
              </MainLayout>
            }
          />

          {/* Route for Login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route for Signup page */}
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <MainLayout
                showFooter={false}
                showtransparentbox={false}
                showHeader={false}
              >
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          {/* Route for LMSpage page */}
          <Route
            path="/LMSpage"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <LMSPage />
              </MainLayout>
            }
          />

          {/* Route for WhatWeOffer page */}
          <Route
            path="/whatweoffer"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <WhatWeOffer 
                  selectedChildCourse={selectedChildCourse} 
                  setSelectedChildCourse={setSelectedChildCourse} 
                />
              </MainLayout>
            }
          />
          <Route
            path="/whoweServe"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <WhoWeOfferPage />
              </MainLayout>
            }
          />

          <Route
            path="/career"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <CareerPage />
              </MainLayout>
            }
          />
          <Route
            path="/course/:courseId"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <CourseDetailModal 
                  selectedChildCourse={selectedChildCourse} 
                  setSelectedChildCourse={setSelectedChildCourse} 
                />
              </MainLayout>
            }
          />

          {/* Route for Placement Program Course Details */}
          <Route
            path="/placement-program/:programKey"
            element={
              <MainLayout showFooter={false} showtransparentbox={false} showWhatsAppChat={false} showAichatbox={false} >
                <PlacementProgramCourseDetails />
              </MainLayout>
            }
          />

          {/* Payment Page for all courses, receives courseName via navigation state */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentOption />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment/success"
            element={<PaymentSuccess />}
          />

          <Route
            path="/payment/failure"
            element={<PaymentFailure />}
          />

          <Route
            path="/privacy-policy"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <PrivacyPolicy/>
              </MainLayout>
            }
          />

          <Route
            path="/terms-and-conditions"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <TermsAndConditions/>
              </MainLayout>
            }
          />

          <Route
            path="/return-policy"
            element={
              <MainLayout showFooter={false} showtransparentbox={false}>
                <ReturnPolicy/>
              </MainLayout>
            }
          />

          {/* Route for Forgot Password page */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Route for Reset Password page */}
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Route for Verify OTP page */}
          <Route path="/verify-otp" element={<VerifyOTP />} />
          {/* Route for Set New Password page */}
          <Route path="/set-new-password" element={<SetNewPassword />} />

          <Route
            path="/dashboard/payment-history"
            element={
              <MainLayout showFooter={false} showtransparentbox={false} showHeader={false}>
                <ProtectedRoute>
                  <PaymentHistory />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/service-form"
            element={
              <MainLayout showFooter={false} showtransparentbox={false} showHeader={false}>
                <ServiceForm />
              </MainLayout>
            }
          />

          {/* 404 Route - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
