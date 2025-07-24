import { body, validationResult } from 'express-validator';

// Validation rules for payment requests
export const validatePaymentRequest = [
  // Order ID validation
  body('orderId')
    .trim()
    .notEmpty()
    .withMessage('Order ID is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Order ID must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Order ID can only contain letters, numbers, hyphens, and underscores'),

  // Amount validation
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 1, max: 1000000 })
    .withMessage('Amount must be a number between 1 and 1,000,000'),

  // Customer name validation
  body('customerName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Customer name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Customer name can only contain letters and spaces'),

  // Customer email validation
  body('customerEmail')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  // Customer phone validation
  body('customerPhone')
    .notEmpty()
    .withMessage('Customer phone is required')
    .matches(/^\d{10}$/)
    .withMessage('Phone number must be exactly 10 digits'),

  // Course name validation
  body('courseName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Course name must be between 1 and 100 characters')
];

// Validation middleware
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

// Additional business logic validation
export const validateBusinessRules = (req, res, next) => {
  const { amount, customerEmail, customerPhone } = req.body;

  // Check for minimum amount (₹1)
  if (amount < 1) {
    return res.status(400).json({
      error: 'Invalid amount',
      details: 'Minimum payment amount is ₹1'
    });
  }

  // Check for maximum amount (₹10,00,000)
  if (amount > 1000000) {
    return res.status(400).json({
      error: 'Invalid amount',
      details: 'Maximum payment amount is ₹10,00,000'
    });
  }

  // Validate phone number format (Indian numbers)
  if (customerPhone && !/^[6-9]\d{9}$/.test(customerPhone)) {
    return res.status(400).json({
      error: 'Invalid phone number',
      details: 'Please enter a valid Indian mobile number'
    });
  }

  // Validate email domain (optional)
  if (customerEmail) {
    const emailDomain = customerEmail.split('@')[1];
    const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
    
    if (blockedDomains.includes(emailDomain)) {
      return res.status(400).json({
        error: 'Invalid email',
        details: 'Temporary email addresses are not allowed'
      });
    }
  }

  next();
}; 