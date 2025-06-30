import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  // Order details
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  orderAmount: {
    type: Number,
    required: true,
    min: 1,
    max: 1000000
  },
  orderCurrency: {
    type: String,
    default: 'INR'
  },

  // Customer details
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guest payments
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  customerPhone: {
    type: String,
    required: true,
    match: /^\d{10}$/
  },

  // Payment gateway details
  paymentSessionId: {
    type: String,
    required: true,
    unique: true
  },
  paymentGateway: {
    type: String,
    default: 'cashfree'
  },
  paymentMode: {
    type: String,
    enum: ['UPI', 'CARD', 'NETBANKING', 'WALLET', 'EMI', 'PAYLATER', 'UNKNOWN'],
    default: 'UNKNOWN'
  },

  // Payment status
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED', 'EXPIRED', 'CANCELLED'],
    default: 'PENDING',
    index: true
  },
  statusUpdatedAt: {
    type: Date,
    default: Date.now
  },

  // Cashfree specific fields
  cashfreeOrderId: {
    type: String,
    unique: true,
    sparse: true
  },
  cashfreeOrderToken: {
    type: String
  },

  // Webhook data
  webhookData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  webhookReceivedAt: {
    type: Date
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },

  // Additional metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Error tracking
  errorMessage: {
    type: String
  },
  retryCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
paymentSchema.index({ customerEmail: 1, createdAt: -1 });
paymentSchema.index({ status: 1, createdAt: -1 });
paymentSchema.index({ customerId: 1, createdAt: -1 });

// Pre-save middleware to update statusUpdatedAt
paymentSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.statusUpdatedAt = new Date();
  }
  this.updatedAt = new Date();
  next();
});

// Static method to find payment by order ID
paymentSchema.statics.findByOrderId = function(orderId) {
  return this.findOne({ orderId });
};

// Static method to find payment by Cashfree order ID
paymentSchema.statics.findByCashfreeOrderId = function(cashfreeOrderId) {
  return this.findOne({ cashfreeOrderId });
};

// Static method to find payments by customer
paymentSchema.statics.findByCustomer = function(customerId) {
  return this.find({ customerId }).sort({ createdAt: -1 });
};

// Static method to find successful payments
paymentSchema.statics.findSuccessful = function() {
  return this.find({ status: 'PAID' }).sort({ createdAt: -1 });
};

// Instance method to update payment status
paymentSchema.methods.updateStatus = function(newStatus, webhookData = null) {
  this.status = newStatus;
  this.statusUpdatedAt = new Date();
  
  if (webhookData) {
    this.webhookData = webhookData;
    this.webhookReceivedAt = new Date();
  }
  
  return this.save();
};

// Virtual for payment age
paymentSchema.virtual('ageInMinutes').get(function() {
  return Math.floor((Date.now() - this.createdAt.getTime()) / (1000 * 60));
});

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `₹${this.orderAmount.toLocaleString('en-IN')}`;
});

// Ensure virtuals are included in JSON
paymentSchema.set('toJSON', { virtuals: true });
paymentSchema.set('toObject', { virtuals: true });

export default mongoose.model('Payment', paymentSchema); 