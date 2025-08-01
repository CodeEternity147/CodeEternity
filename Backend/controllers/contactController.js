import emailService from '../services/emailService.js';

export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, parentCategory, childCourse, message } = req.body;

    // Validate required fields
    if (!name || !email || !parentCategory || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, parentCategory, and message are required.' 
      });
    }

    // Log the form submission
    console.log('Contact Form Submission:', {
      name,
      email,
      parentCategory,
      childCourse,
      message,
      timestamp: new Date().toISOString()
    });

    // Send email using the email service
    try {
      await emailService.sendContactFormEmail(req.body);
      res.status(200).json({ 
        message: 'Your message has been received! We will get back to you soon.' 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still log the submission even if email fails
      res.status(200).json({ 
        message: 'Your message has been received! We will get back to you soon.' 
      });
    }
    
  } catch (error) {
    console.error('Error in sendContactEmail function:', error);
    res.status(500).json({ 
      message: 'Failed to process your request. Please try again later.' 
    });
  }
};


