import dotenv from 'dotenv';
import axios from 'axios';

export const paymentcontroller = async (req, res) => {

dotenv.config();

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const ENV = process.env.NODE_ENV === 'production' ? "PROD" : "TEST"; // Use environment variable

// Validate credentials
if (!APP_ID || !SECRET_KEY) {
  console.error("Cashfree credentials are missing! Please check your .env file");
  console.error("Required environment variables:");
  console.error("CASHFREE_APP_ID: ", APP_ID ? "Present" : "Missing");
  console.error("CASHFREE_SECRET_KEY: ", SECRET_KEY ? "Present" : "Missing");
}

// Use the correct API endpoint based on environment
const CASHFREE_API_URL = ENV === "PROD" 
  ? "https://api.cashfree.com/pg/orders"
  : "https://sandbox.cashfree.com/pg/orders";

// Define base URLs based on environment
const BASE_URL = ENV === "PROD" 
  ? process.env.FRONTEND_URL || "https://codeeternity.com"
  : "http://localhost:3000"; // Adjust port as needed for your frontend

  
    try {
      // Validate credentials before proceeding
      if (!APP_ID || !SECRET_KEY) {
        return res.status(500).json({
          error: "Payment gateway configuration error",
          details: "Cashfree credentials are not properly configured"
        });
      }
  
      console.log("Received request body:", req.body);
      const { orderId, amount } = req.body;
  
      if (!orderId || !amount) {
        return res.status(400).json({ 
          error: "Missing required fields",
          details: "orderId and amount are required" 
        });
      }
  
      // Default customer details if not provided
      const customerDetails = {
        customer_id: "cust_" + Date.now(),
        customer_name: req.body.customerName || "Guest User",
        customer_email: req.body.customerEmail || "guest@example.com",
        customer_phone: req.body.customerPhone || "9999999999",
      };
  
      console.log("Customer details:", customerDetails);
      console.log("Using Cashfree credentials:", {
        APP_ID: APP_ID.substring(0, 4) + "..." + APP_ID.substring(APP_ID.length - 4),
        ENV,
        API_URL: CASHFREE_API_URL
      });
  
      const orderRequest = {
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customerDetails.customer_id,
          customer_name: customerDetails.customer_name,
          customer_email: customerDetails.customer_email,
          customer_phone: customerDetails.customer_phone,
        },
        order_meta: {
          return_url: `${BASE_URL}/payment/success?order_id={order_id}`,
          notify_url: `${BASE_URL}/api/payment/webhook`,
          failure_url: `${BASE_URL}/payment/failure?order_id={order_id}`
        }
      };
  
      console.log("Creating order with request:", orderRequest);
  
      // Make the API request to Cashfree
      const response = await axios({
        method: 'post',
        url: CASHFREE_API_URL,
        data: orderRequest,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-version': '2022-09-01',
          'x-client-id': APP_ID.trim(),
          'x-client-secret': SECRET_KEY.trim()
        }
      });
  
      console.log("Cashfree API Response:", response.data);
  
      // Validate response
      if (!response.data || !response.data.payment_session_id) {
        console.error("Invalid response from Cashfree:", response.data);
        throw new Error("Invalid response from payment gateway");
      }
  
      // Process the payment session (backend validation)
      // Comment out or implement processPayment function
      // const paymentResult = await processPayment(response.data.payment_session_id);
  
      // Construct payment link based on environment
      const paymentLink = ENV === "PROD" 
      ? `https://payments.cashfree.com/pg/orders/${response.data.order_id}/pay?session_id=${response.data.payment_session_id}`
      : `https://sandbox.cashfree.com/pg/orders/${response.data.order_id}/pay?session_id=${response.data.payment_session_id}`;
    
      console.log("Generated payment link:", paymentLink);
  
      // Return payment session ID and order info for frontend to use
      return res.json({
        success: true,
        payment_session_id: response.data.payment_session_id,
        order_id: response.data.order_id,
        payment_link: paymentLink,
        order_status: response.data.order_status,
        order_token: response.data.order_token,
        message: "Order created successfully. Use payment_session_id to render checkout on frontend."
      });
    } 
    catch (error) {
      console.error("Error creating order:", error.message);
      console.error("Error details:", error.response?.data || "No additional details");
      
      // Return a more descriptive error message
      return res.status(error.response?.status || 500).json({
        error: "Payment gateway error",
        message: error.response?.data?.message || error.message,
        details: error.response?.data || "No additional details"
      });
    }
  }

// Webhook handler for payment notifications
export const webhookHandler = async (req, res) => {
  try {
    console.log("Webhook received:", req.body);
    
    // Verify webhook signature (recommended for production)
    // const signature = req.headers['x-webhook-signature'];
    // if (!verifyWebhookSignature(req.body, signature)) {
    //   return res.status(401).json({ error: "Invalid signature" });
    // }
    
    const { orderId, orderAmount, orderStatus, paymentMode, customerDetails } = req.body;
    
    // Handle different payment statuses
    switch (orderStatus) {
      case 'PAID':
        console.log(`Payment successful for order: ${orderId}`);
        // Update your database, send confirmation email, etc.
        break;
      case 'FAILED':
        console.log(`Payment failed for order: ${orderId}`);
        // Handle failed payment
        break;
      case 'EXPIRED':
        console.log(`Payment expired for order: ${orderId}`);
        // Handle expired payment
        break;
      default:
        console.log(`Unknown payment status: ${orderStatus} for order: ${orderId}`);
    }
    
    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ status: "success", message: "Webhook received" });
    
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

// Test endpoint for localhost verification
export const testPaymentSetup = async (req, res) => {
  try {
    const APP_ID = process.env.CASHFREE_APP_ID;
    const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const ENV = process.env.NODE_ENV === 'production' ? "PROD" : "TEST";
    
    const BASE_URL = ENV === "PROD" 
      ? process.env.FRONTEND_URL || "https://codeeternity.com"
      : "http://localhost:3000";
    
    res.json({
      status: "success",
      environment: ENV,
      baseUrl: BASE_URL,
      credentials: {
        appId: APP_ID ? "Present" : "Missing",
        secretKey: SECRET_KEY ? "Present" : "Missing"
      },
      apiUrl: ENV === "PROD" 
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders",
      message: "Payment setup test completed"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};