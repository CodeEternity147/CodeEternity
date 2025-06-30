import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useScrollToTop from '../../hooks/useScrollToTop';
import api from '../../utils/axios';

const PaymentSuccess = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const orderId = searchParams.get('order_id');
  const paymentStatus = searchParams.get('payment_status');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        setLoading(true);
        if (!orderId) {
          toast.error('No order ID found.');
          navigate('/payment/failure');
          return;
        }
        setVerifying(true);
        // Always verify payment status with backend
        const response = await api.get(`/payment/verify/${orderId}`);
        if (response.data.success && response.data.payment) {
          if (response.data.payment.status === 'PAID') {
            setPaymentDetails({
              ...response.data.payment,
              verified: response.data.synced,
              cashfreeStatus: response.data.cashfreeStatus
            });
            toast.success('Payment completed successfully!', {
              position: "top-right",
              autoClose: 5000,
            });
          } else {
            // Not paid, redirect to failure page
            navigate(`/payment/failure?order_id=${orderId}&payment_status=${response.data.payment.status}`);
            return;
          }
        } else {
          // No payment found, redirect to failure
          navigate(`/payment/failure?order_id=${orderId}`);
          return;
        }
      } catch (error) {
        // On error, redirect to failure page
        navigate(`/payment/failure?order_id=${orderId}`);
      } finally {
        setVerifying(false);
        setLoading(false);
      }
    };
    handlePaymentSuccess();
  }, [orderId, navigate]);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your payment. Your transaction has been completed successfully.
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
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {paymentDetails.status}
                    </span>
                  </dd>
                </div>
                {paymentDetails.orderAmount && (
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      ₹{paymentDetails.orderAmount.toLocaleString('en-IN')}
                    </dd>
                  </div>
                )}
                {paymentDetails.paymentMode && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Payment Mode</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {paymentDetails.paymentMode}
                    </dd>
                  </div>
                )}
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {paymentDetails.createdAt ? new Date(paymentDetails.createdAt).toLocaleString() : paymentDetails.timestamp}
                  </dd>
                </div>
                {paymentDetails.verified !== undefined && (
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Verification</dt>
                    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        paymentDetails.verified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {paymentDetails.verified ? 'Verified' : 'Pending Verification'}
                      </span>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleContinue}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue to Dashboard
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
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 