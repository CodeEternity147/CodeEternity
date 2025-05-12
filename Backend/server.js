import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// ✅ Configure CORS correctly
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'https://codeeternityofficial.netlify.app',
    credentials: true,
  })
);

// Handle preflight requests (for POST, PUT, etc.)
app.options('*', cors({
  origin: process.env.FRONTEND_URL || 'https://codeeternityofficial.netlify.app',
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);

// Token verification endpoint
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('firstName lastName email role dob');
    if (!user) {
      return res.status(404).json({ valid: false, message: 'User not found' });
    }
    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('CodeEternity Backend is running...');
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
