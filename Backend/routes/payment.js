// backend/routes/payment.js
import express from "express";
import { 
  paymentcontroller, 
  webhookHandler, 
  testPaymentSetup, 
  testWebhook,
  getPaymentByOrderId,
  getUserPaymentHistory,
  getAllPayments,
  verifyPaymentStatus,
  getPaymentStats
} from "../controllers/paymentcontroller.js";
import { validatePaymentRequest, handleValidationErrors, validateBusinessRules } from "../middleware/paymentValidation.js";
import { authenticateToken, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Payment creation and webhook
// Note: optionalAuth allows both guest and authenticated payments
router.post("/create-order", optionalAuth, validatePaymentRequest, handleValidationErrors, validateBusinessRules, paymentcontroller);
router.post("/webhook", webhookHandler);

// Test endpoints
router.get("/test", testPaymentSetup);
router.get("/test-webhook", testWebhook);

// Payment management endpoints
router.get("/order/:orderId", getPaymentByOrderId);
router.get("/history", authenticateToken, getUserPaymentHistory);
router.get("/all", authenticateToken, getAllPayments);
router.get("/verify/:orderId", verifyPaymentStatus);
router.get("/stats", authenticateToken, getPaymentStats);

export default router;
