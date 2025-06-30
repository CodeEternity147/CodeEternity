export const errorHandler = (err, req, res, next) => {
  // Log error details
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Don't expose internal errors in production
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // In production, don't expose stack traces
    res.status(500).json({ 
      message: 'Internal server error',
      error: 'Something went wrong. Please try again later.'
    });
  } else {
    // In development, show full error details
    res.status(500).json({ 
      message: err.message || 'Server Error',
      stack: err.stack,
      error: err
    });
  }
};
