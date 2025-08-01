import express from 'express';
import { sendServiceFormEmail } from '../controllers/serviceFormController.js';

const router = express.Router();

router.post('/service-form', sendServiceFormEmail);

export default router; 