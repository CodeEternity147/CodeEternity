import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useScrollToTop from '../../hooks/useScrollToTop';

const PaymentFailure = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const orderId = searchParams.get('order_id');
  const paymentStatus = searchParams.get('payment_status');
  const errorMessage = searchParams.get('error_message');

  useEffect(() => {
    const handlePaymentFailure = async () => {
      try {
        setLoading(true);
        
        // Log the payment failure details
        // console.log('Payment Failure Details:', {
        //   orderId,
        //   paymentStatus,
        //   errorMessage,
        //   allParams: Object.fromEntries(searchParams.entries())
        // });

        setPaymentDetails({
          orderId,
          status: paymentStatus || 'failed',
          errorMessage: errorMessage || 'Payment was not completed',
          timestamp: new Date().toLocaleString()
        });

        // Show error message
        toast.error('Payment failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
        });

      } catch (error) {
        console.error('Error handling payment failure:', error);
        toast.error('Error processing payment failure', {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    handlePaymentFailure();
  }, [orderId, paymentStatus, errorMessage, searchParams]);

  const handleRetry = () => {
    // Navigate back to payment page or retry
    navigate(-1); // Go back to previous page
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    navigate('/contactCodeEternity');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Failure Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Failed
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            We're sorry, but your payment could not be processed. Please try again or contact support if the problem persists.
          </p>
        </div>

        {paymentDetails && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Payment Details
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {paymentDetails.orderId}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {paymentDetails.status}
                    </span>
                  </dd>
                </div>
                {paymentDetails.errorMessage && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Error</dt>
                    <dd className="mt-1 text-sm text-red-600 sm:mt-0 sm:col-span-2">
                      {paymentDetails.errorMessage}
                    </dd>
                  </div>
                )}
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {paymentDetails.timestamp}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleRetry}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
          
          <button
            onClick={handleContactSupport}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact Support
          </button>
          
          <button
            onClick={handleGoHome}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Home
          </button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure; 