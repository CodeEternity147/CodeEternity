import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import payment from './routes/payment.js'
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/authMiddleware.js';
import { securityMiddleware } from './middleware/securityMiddleware.js';
import User from './models/User.js';

dotenv.config();

const app = express();

// Apply security middleware
// securityMiddleware(app);

// Configure CORS for both development and production
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://codeeternity.com', // Production
  process.env.FRONTEND_URL // Environment variable
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Handle preflight requests (for POST, PUT, etc.)
app.options('*', cors(corsOptions));

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/payment', payment);

// Token verification endpoint
app.get('/api/auth/verify', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('firstName lastName email role dob mobile');
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
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
