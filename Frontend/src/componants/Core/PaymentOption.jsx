import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createOrderAndCheckout } from '../../utils/payment';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const PaymentOption = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const courseName = location.state?.courseName || '';
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  const plans = [
    {
      name: "Basic Plan",
      price: "₹1999",
      duration: "3 Month",
      features: {
        "Basic Course Access": true,
        "Community Support": true,
        "Basic Projects": true,
        "Email Support": true,
        "Project Reviews": true,
        "Certificate": true,
        "Advanced Courses": false,
        "Career Guidance": false,
        "Live Sessions": false,
        "1-on-1 Mentorship": false,
        "Access to Webinars": false,
      },
      buttonText: "Get Started",
      popular: false,
      gradient: "from-gray-700 to-gray-800",
      glowColor: "gray"
    },
    {
      name: "Pro Plan",
      price: "₹4999",
      duration: "3 Months",
      features: {
        "Basic Course Access": true,
        "Community Support": true,
        "Basic Projects": true,
        "Email Support": true,
        "Project Reviews": true,
        "Certificate": true,
        "Advanced Courses": true,
        "Career Guidance": true,
        "Live Sessions": false,
        "1-on-1 Mentorship": false,
        "Access to Webinars": false,
      },
      buttonText: "Get Started",
      popular: true,
      gradient: "from-blue-600 to-purple-700",
      glowColor: "blue"
    },
    {
      name: "Premium Plan",
      price: "₹9999",
      duration: "6 Months",
      features: {
        "Basic Course Access": true,
        "Community Support": true,
        "Basic Projects": true,
        "Email Support": true,
        "Project Reviews": true,
        "Certificate": true,
        "Advanced Courses": true,
        "Career Guidance": true,
        "Live Sessions": true,
        "1-on-1 Mentorship": true,
        "Access to Webinars": true,
      },
      buttonText: "Get Started",
      popular: false,
      gradient: "from-purple-600 to-pink-700",
      glowColor: "purple"
    }
  ];

  const allFeatures = [
    "Basic Course Access",
    "Community Support",
    "Basic Projects",
    "Email Support",
    "Advanced Courses",
    "Project Reviews",
    "Live Sessions",
    "Certificate",
    "1-on-1 Mentorship",
    "Career Guidance",
    "Access to Webinars"
  ];

  const handlePlanPayment = async (plan) => {
    try {
      setLoading(true);
      const amount = parseInt(plan.price.replace('₹', ''));

      if (!user?.mobile || !/^\d{10}$/.test(user.mobile)) {
        toast.error('First update your profile with mobile number');
        setLoading(false);
        return;
      }

      // Prepare order data
      const orderData = {
        orderId: `order_${Date.now()}`,
        amount: amount,
        customerName: user?.firstName + ' ' + user?.lastName || 'Guest User',
        customerEmail: user?.email || 'guest@example.com',
        customerPhone: user.mobile,
        courseName: courseName
      };

      await createOrderAndCheckout(orderData);
      // Optionally show a success toast here if needed
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Heading for course name */}
      {courseName && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Pay for {courseName}
          </h1>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unlock your potential with our premium coding courses designed for every skill level
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:max-w-6xl lg:mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative transform transition-all duration-700 hover:scale-105 animate-fade-in-up h-full`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}></div>
              
              <div className={`relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border ${
                plan.popular
                  ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20'
                  : 'border-gray-700/50'
              } overflow-hidden transition-all duration-300 hover:border-opacity-100 h-full flex flex-col`}>
                
                {plan.popular && (
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg animate-bounce">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                  {/* Header Section */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <div className="flex items-center justify-center">
                      <span className="text-5xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-400 ml-2 text-lg">
                        /{plan.duration}
                      </span>
                    </div>
                  </div>

                  {/* Features Section - Fixed height */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3">
                      {allFeatures.map((feature, featureIndex) => {
                        const isIncluded = plan.features[feature];
                        return (
                          <li 
                            key={feature} 
                            className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300"
                            style={{ transitionDelay: `${featureIndex * 30}ms` }}
                          >
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                              {isIncluded ? (
                                <svg
                                  className="w-5 h-5 text-green-400 group-hover:text-green-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5 text-red-400 group-hover:text-red-300"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <span className={`leading-relaxed transition-colors duration-300 text-sm ${
                              isIncluded 
                                ? 'text-gray-300 group-hover:text-white' 
                                : 'text-gray-500 group-hover:text-gray-400 line-through'
                            }`}>
                              {feature}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Button Section - Always at bottom */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handlePlanPayment(plan)}
                      disabled={loading}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 relative overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25'
                          : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                      } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            {plan.buttonText}
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white to-transparent opacity-20 transform skew-y-12 transition-transform duration-1000 group-hover:translate-y-full"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Secure payment processing</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default PaymentOption;