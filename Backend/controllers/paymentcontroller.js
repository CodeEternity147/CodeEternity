import dotenv from 'dotenv';
import axios from 'axios';
import crypto from 'crypto';
import Payment from '../models/Payment.js';

export const paymentcontroller = async (req, res) => {

dotenv.config();

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const ENV = process.env.NODE_ENV === 'production' ? "PROD" : "TEST"; // Use environment variable
const ENV = "PROD";

// Validate credentials
if (!APP_ID || !SECRET_KEY) {
  console.error("Cashfree credentials are missing! Please check your .env file");
  console.error("Required environment variables:");
  console.error("CASHFREE_APP_ID: ", APP_ID ? "Present" : "Missing");
  console.error("CASHFREE_SECRET_KEY: ", SECRET_KEY ? "Present" : "Missing");
}

// Use the correct API endpoint based on environment
// const CASHFREE_API_URL = ENV === "PROD" 
//   ? "https://api.cashfree.com/pg/orders"
//   : "https://sandbox.cashfree.com/pg/orders";
const CASHFREE_API_URL = "https://api.cashfree.com/pg/orders";


// Define base URLs based on environment
// const BASE_URL = ENV === "PROD" 
//   ? process.env.FRONTEND_URL || "https://codeeternity.com"
//   : "http://localhost:3000"; // Adjust port as needed for your frontend

const BASE_URL = "https://codeeternity.com";


  
    try {
      // Validate credentials before proceeding
      if (!APP_ID || !SECRET_KEY) {
        return res.status(500).json({
          error: "Payment gateway configuration error",
          details: "Cashfree credentials are not properly configured"
        });
      }
  
      // console.log("Processing payment request:", {
      //   orderId: req.body.orderId,
      //   amount: req.body.amount,
      //   customerEmail: req.body.customerEmail,
      //   environment: ENV
      // });
  
      const { orderId, amount, courseName } = req.body;
  
      // Check if payment already exists
      const existingPayment = await Payment.findByOrderId(orderId);
      if (existingPayment) {
        return res.status(400).json({
          error: "Duplicate order",
          details: "An order with this ID already exists"
        });
      }
  
      // Default customer details if not provided
      const customerDetails = {
        customer_id: "cust_" + Date.now(),
        customer_name: req.body.customerName || "Guest User",
        customer_email: req.body.customerEmail || "guest@example.com",
        customer_phone: req.body.customerPhone
      };
  
      // console.log("Using Cashfree credentials:", {
      //   APP_ID: APP_ID ? "Present" : "Missing",
      //   ENV,
      //   API_URL: CASHFREE_API_URL
      // });
  
      // const orderRequest = {
      //   order_id: orderId,
      //   order_amount: amount,
      //   order_currency: "INR",
      //   customer_details: {
      //     customer_id: customerDetails.customer_id,
      //     customer_name: customerDetails.customer_name,
      //     customer_email: customerDetails.customer_email,
      //     customer_phone: customerDetails.customer_phone
      //   },
      //   order_meta: {
      //     return_url: `${BASE_URL}/payment/success?order_id={order_id}`,
      //     notify_url: `${BASE_URL}/api/payment/webhook`,
      //     failure_url: `${BASE_URL}/payment/failure?order_id={order_id}`,
      //     order_note: courseName || ''
      //   }
      // };
  

      const orderRequest = {
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        order_note: courseName || '',  // ✅ Moved to top-level
        order_tags: {
          course_name: courseName || 'Unknown Course'  // ✅ Optional structured metadata
        },
        customer_details: {
          customer_id: customerDetails.customer_id,
          customer_name: customerDetails.customer_name,
          customer_email: customerDetails.customer_email,
          customer_phone: customerDetails.customer_phone
        },
        order_meta: {
          return_url: `${BASE_URL}/payment/success?order_id={order_id}`,
          notify_url: `${BASE_URL}/api/payment/webhook`,
          failure_url: `${BASE_URL}/payment/failure?order_id={order_id}`
        }
      };
      
      // console.log("Creating order with Cashfree API..." , orderRequest.order_tags.course_name );
  
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
  
      // console.log("Cashfree API Response received:", {
      //   orderId: response.data?.order_id,
      //   status: response.data?.order_status,
      //   hasSessionId: !!response.data?.payment_session_id
      // });
      // console.log("Cashfree API Response received:", response.data);
  
      // Validate response
      if (!response.data || !response.data.payment_session_id) {
        console.error("Invalid response from Cashfree:", response.data);
        throw new Error("Invalid response from payment gateway");
      }

      // Create Payment record in database after successful Cashfree order creation
      const paymentData = {
        orderId: orderId,
        orderAmount: amount,
        orderCurrency: "INR",
        customerName: customerDetails.customer_name,
        customerEmail: customerDetails.customer_email,
        customerPhone: customerDetails.customer_phone,
        paymentSessionId: response.data.payment_session_id,
        paymentGateway: "cashfree",
        status: "PENDING",
        cashfreeOrderId: response.data.order_id,
        cashfreeOrderToken: response.data.order_token || null,
        metadata: {
          customerId: customerDetails.customer_id,
          environment: ENV,
          originalOrderId: orderId,
          courseName: courseName || ''
        }
      };

      // Add customerId if user is authenticated
      if (req.user && req.user.id) {
        paymentData.customerId = req.user.id;
      }

      const payment = await Payment.create(paymentData);
      // console.log("Payment record created in database:", payment.orderId);
  
      // Construct payment link based on environment
      // const paymentLink = ENV === "PROD" 
      // ? `https://payments.cashfree.com/pg/orders/${response.data.order_id}/pay?session_id=${response.data.payment_session_id}`
      // : `https://sandbox.cashfree.com/pg/orders/${response.data.order_id}/pay?session_id=${response.data.payment_session_id}`;

      const paymentLink = `https://payments.cashfree.com/pg/orders/${response.data.order_id}/pay?session_id=${response.data.payment_session_id}`;
    
      // console.log("Payment link generated successfully");
  
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

// Webhook signature verification function
const verifyWebhookSignature = (payload, signature, secret) => {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
};

// Webhook handler for payment notifications
export const webhookHandler = async (req, res) => {
  try {
    // console.log("Webhook received for order:", req.body?.orderId);
    
    // Verify webhook signature (CRITICAL for production)
    const signature = req.headers['x-webhook-signature'];
    const webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error("Webhook secret not configured");
      return res.status(500).json({ error: "Webhook configuration error" });
    }
    
    if (!signature) {
      console.error("No webhook signature provided");
      return res.status(401).json({ error: "Missing webhook signature" });
    }
    
    if (!verifyWebhookSignature(req.body, signature, webhookSecret)) {
      console.error("Invalid webhook signature");
      return res.status(401).json({ error: "Invalid webhook signature" });
    }
    
    // console.log("Webhook signature verified successfully");
    
    const { orderId, orderAmount, orderStatus, paymentMode, customerDetails } = req.body;
    
    // Find payment record by orderId or cashfreeOrderId
    let payment = await Payment.findByOrderId(orderId);
    if (!payment) {
      // Try to find by cashfreeOrderId
      payment = await Payment.findByCashfreeOrderId(orderId);
    }
    
    if (!payment) {
      console.error(`Payment record not found for order: ${orderId}`);
      return res.status(404).json({ error: "Payment record not found" });
    }

    // Map Cashfree status to our status
    let newStatus;
    switch (orderStatus) {
      case 'PAID':
        newStatus = 'PAID';
        console.log(`Payment successful for order: ${orderId}`);
        break;
      case 'FAILED':
        newStatus = 'FAILED';
        console.log(`Payment failed for order: ${orderId}`);
        break;
      case 'EXPIRED':
        newStatus = 'EXPIRED';
        console.log(`Payment expired for order: ${orderId}`);
        break;
      default:
        newStatus = 'PENDING';
        console.log(`Unknown payment status: ${orderStatus} for order: ${orderId}`);
    }

    // Update payment record
    await payment.updateStatus(newStatus, req.body);
    
    // Update payment mode if provided
    if (paymentMode) {
      payment.paymentMode = paymentMode;
      await payment.save();
    }

    console.log(`Payment status updated to ${newStatus} for order: ${payment.orderId}`);
    
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

// Test webhook endpoint for verification
export const testWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      return res.status(500).json({ 
        error: "Webhook secret not configured",
        message: "Please add CASHFREE_WEBHOOK_SECRET to your environment variables"
      });
    }
    
    // Create a test payload similar to what Cashfree sends
    const testPayload = {
      orderId: "test_order_123",
      orderAmount: 100,
      orderStatus: "PAID",
      paymentMode: "UPI",
      customerDetails: {
        customerEmail: "test@example.com",
        customerPhone: "1234567890"
      }
    };
    
    // Generate test signature
    const testSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(testPayload))
      .digest('hex');
    
    res.json({
      status: "success",
      message: "Webhook configuration test",
      webhookUrl: `${req.protocol}://${req.get('host')}/api/payment/webhook`,
      testPayload,
      testSignature: `x-webhook-signature: ${testSignature}`,
      instructions: [
        "1. Copy the webhook URL above",
        "2. Add it to your Cashfree dashboard webhook settings",
        "3. Copy the webhook secret from Cashfree dashboard",
        "4. Add it to your .env file as CASHFREE_WEBHOOK_SECRET",
        "5. Test with the signature above"
      ]
    });
    
  } catch (error) {
    console.error("Test webhook error:", error);
    res.status(500).json({ error: "Test webhook failed" });
  }
};

// Get payment by order ID
export const getPaymentByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const payment = await Payment.findByOrderId(orderId);
    if (!payment) {
      return res.status(404).json({
        error: "Payment not found",
        details: "No payment found with this order ID"
      });
    }

    res.json({
      success: true,
      payment: payment
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({
      error: "Failed to fetch payment",
      details: error.message
    });
  }
};

// Get payment history for a user
export const getUserPaymentHistory = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: "Authentication required",
        details: "User must be logged in to view payment history"
      });
    }

    const payments = await Payment.findByCustomer(userId);
    
    res.json({
      success: true,
      payments: payments,
      count: payments.length
    });
  } catch (error) {
    console.error("Error fetching user payment history:", error);
    res.status(500).json({
      error: "Failed to fetch payment history",
      details: error.message
    });
  }
};

// Get all payments (admin only)
export const getAllPayments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) {
      query.status = status;
    }

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('customerId', 'firstName lastName email');

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      payments: payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching all payments:", error);
    res.status(500).json({
      error: "Failed to fetch payments",
      details: error.message
    });
  }
};

// Verify payment status with Cashfree
export const verifyPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const payment = await Payment.findByOrderId(orderId);
    if (!payment) {
      return res.status(404).json({
        error: "Payment not found",
        details: "No payment found with this order ID"
      });
    }

    // Get Cashfree credentials
    const APP_ID = process.env.CASHFREE_APP_ID;
    const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
    const ENV = process.env.NODE_ENV === 'production' ? "PROD" : "TEST";
    
    const CASHFREE_API_URL = ENV === "PROD" 
      ? "https://api.cashfree.com/pg/orders"
      : "https://sandbox.cashfree.com/pg/orders";

    // Verify with Cashfree API
    const response = await axios({
      method: 'get',
      url: `${CASHFREE_API_URL}/${payment.cashfreeOrderId}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-version': '2022-09-01',
        'x-client-id': APP_ID.trim(),
        'x-client-secret': SECRET_KEY.trim()
      }
    });

    const cashfreeStatus = response.data.order_status;
    
    // Update local status if different
    if (cashfreeStatus !== payment.status) {
      await payment.updateStatus(cashfreeStatus, response.data);
      console.log(`Payment status synced: ${payment.status} -> ${cashfreeStatus}`);
    }

    res.json({
      success: true,
      payment: payment,
      cashfreeStatus: cashfreeStatus,
      synced: cashfreeStatus === payment.status
    });
  } catch (error) {
    console.error("Error verifying payment status:", error);
    res.status(500).json({
      error: "Failed to verify payment status",
      details: error.message
    });
  }
};

// Get payment statistics
export const getPaymentStats = async (req, res) => {
  try {
    const stats = await Payment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$orderAmount' }
        }
      }
    ]);

    const totalPayments = await Payment.countDocuments();
    const successfulPayments = await Payment.countDocuments({ status: 'PAID' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'PAID' } },
      { $group: { _id: null, total: { $sum: '$orderAmount' } } }
    ]);

    res.json({
      success: true,
      stats: stats,
      summary: {
        totalPayments,
        successfulPayments,
        successRate: totalPayments > 0 ? (successfulPayments / totalPayments * 100).toFixed(2) : 0,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    console.error("Error fetching payment stats:", error);
    res.status(500).json({
      error: "Failed to fetch payment statistics",
      details: error.message
    });
  }
};