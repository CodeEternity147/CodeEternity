import React, { useState } from 'react';
import { createOrderAndCheckout } from '../../utils/payment';

const PaymentButton = ({ amount, orderId, customerDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderData = {
        orderId: orderId || `order_${Date.now()}`,
        amount: amount,
        customerName: customerDetails?.name || 'Guest User',
        customerEmail: customerDetails?.email || 'guest@example.com',
        customerPhone: customerDetails?.phone || '9999999999'
      };

      console.log('Initiating payment with:', orderData);

      // Create order and render checkout
      const result = await createOrderAndCheckout(orderData);
      
      console.log('Payment initiated successfully:', result);
      
      // The checkout will open automatically
      // User will be redirected to Cashfree payment page
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-button-container">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
      
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentButton; 