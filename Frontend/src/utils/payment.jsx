import { load } from "@cashfreepayments/cashfree-js";
import api from './axios.js';

let cashfree;

// Backend API URL - adjust this based on your backend port
const BACKEND_URL = 'http://localhost:5000';

// Initialize Cashfree SDK
const initializeCashfree = async () => {
  try {
    cashfree = await load({
      mode: import.meta.env.PROD ? "production" : "sandbox" // Use production for live payments
    });
    // console.log("Cashfree SDK initialized successfully");
    return cashfree;
  } catch (error) {
    console.error("Error initializing Cashfree SDK:", error);
    throw error;
  }
};

// Render checkout with payment session ID
const renderCheckout = async (paymentSessionId) => {
  try {
    if (!cashfree) {
      await initializeCashfree();
    }

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: "_self", // or "_blank" for new tab
    };

    // console.log("Rendering checkout with session ID:", paymentSessionId);
    return await cashfree.checkout(checkoutOptions);
  } catch (error) {
    console.error("Error rendering checkout:", error);
    throw error;
  }
};

// Create order and render checkout
const createOrderAndCheckout = async (orderData) => {
  try {
    // console.log("Creating order with data:", orderData);
    
    // Debug: Log the axios baseURL
          // console.log("Axios baseURL:", api.defaults.baseURL);
      // console.log("Full URL being requested:", `${api.defaults.baseURL}/payment/create-order`);
    
    // First create order on backend using axios
    const response = await api.post('/payment/create-order', orderData);
    
          // console.log("Order creation result:", response.data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create order');
    }

    // Then render checkout with payment session ID
    await renderCheckout(response.data.payment_session_id);
    
    return response.data;
  } catch (error) {
    console.error("Error in createOrderAndCheckout:", error);
    throw error;
  }
};

export { initializeCashfree, renderCheckout, createOrderAndCheckout };
