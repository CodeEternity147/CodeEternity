import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { securityMiddleware } from './middleware/securityMiddleware.js';
import cors from 'cors';
import User from './models/User.js';

dotenv.config();
connectDB();

const app = express();

// Security middleware
securityMiddleware(app);

// Body parser
app.use(express.json({ limit: '10kb' })); // Limit body size

// CORS configuration - Updated
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost variations
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
}));

// Additional CORS headers for preflight requests
app.options('*', cors());

// Routes
app.use('/api/auth', authRoutes);

// Token verification endpoint
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    // Get the complete user data from the database
    const user = await User.findById(req.user.id).select('firstName lastName email role dob');
    if (!user) {
      return res.status(404).json({ valid: false, message: 'User not found' });
    }
    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
