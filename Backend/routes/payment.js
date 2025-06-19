// backend/routes/payment.js
import express from "express";
import { paymentcontroller, webhookHandler, testPaymentSetup } from "../controllers/paymentcontroller.js";

const router = express.Router();
router.post("/create-order", paymentcontroller);
router.post("/webhook", webhookHandler);
router.get("/test", testPaymentSetup);

export default router;
