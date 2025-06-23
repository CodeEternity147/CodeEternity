import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Input validation helper
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Helper to send email
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Basic input validation
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    
    // Check if user exists with the same email
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password with lower salt rounds for better performance
    const hashedPassword = await bcrypt.hash(password, 8);
    
    // Create user with lowercase email
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user'
    });

    // Generate token with shorter expiration
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Registration error from Backend:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    return res.status(500).json({ message: err.message || 'Registration failed. Please try again.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: err.message || 'Login failed. Please try again.' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, dob , } = req.body;
    
    // Input validation
    if (!firstName && !lastName && !dob) {
      return res.status(400).json({ message: 'At least one field must be provided for update' });
    }

    if (firstName && firstName.trim().length === 0) {
      return res.status(400).json({ message: 'First name cannot be empty' });
    }

    if (lastName && lastName.trim().length === 0) {
      return res.status(400).json({ message: 'Last name cannot be empty' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (firstName) user.firstName = firstName.trim();
    if (lastName) user.lastName = lastName.trim();
    if (dob) user.dob = dob;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
};

// Get current user info
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('firstName lastName email role dob');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Request OTP for password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'Email not found. Please sign up.' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.resetOTP = otp;
    user.resetOTPExpiry = otpExpiry;
    await user.save();
    await sendEmail(user.email, 'Your Password Reset OTP', `Your OTP is: ${otp}`);
    res.status(200).json({ message: 'OTP sent to your email.' });
  } catch (err) {
    console.error('Request password reset error:', err);
    return res.status(500).json({ message: err.message || 'Failed to send OTP. Please try again.' });
  }
};

// Reset password with OTP
export const resetPasswordWithOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!validateEmail(email) || !otp || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.resetOTP !== otp || Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 8);
    user.password = hashedPassword;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Reset password with OTP error:', err);
    return res.status(500).json({ message: err.message || 'Failed to reset password. Please try again.' });
  }
};

// Verify OTP endpoint
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!validateEmail(email) || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || user.resetOTP !== otp || Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Verify OTP error:', err);
    return res.status(500).json({ message: err.message || 'Failed to verify OTP. Please try again.' });
  }
};
