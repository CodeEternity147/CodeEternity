import express from 'express';
import { register, login, getMe, updateProfile, changePassword, requestPasswordReset, resetPasswordWithOTP, verifyOTP } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPasswordWithOTP);
router.post('/verify-otp', verifyOTP);

// Protected routes
router.get('/me', authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json({ user });
});
router.put('/me', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

export default router;
