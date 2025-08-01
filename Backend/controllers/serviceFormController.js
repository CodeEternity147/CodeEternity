import emailService from '../services/emailService.js';

export const sendServiceFormEmail = async (req, res) => {
  try {
    const { name, email, mobile, course, description } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !course || !description) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, email, mobile, course, and description are required.' 
      });
    }

    // Log the form submission
    console.log('Service Form Submission:', {
      name,
      email,
      mobile,
      course,
      description,
      timestamp: new Date().toISOString()
    });

    // Send email using the email service
    try {
      await emailService.sendServiceFormEmail(req.body);
      res.status(200).json({ 
        message: 'Your service inquiry has been received! We will get back to you soon.' 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still log the submission even if email fails
      res.status(200).json({ 
        message: 'Your service inquiry has been received! We will get back to you soon.' 
      });
    }
    
  } catch (error) {
    console.error('Error in sendServiceFormEmail function:', error);
    res.status(500).json({ 
      message: 'Failed to process your request. Please try again later.' 
    });
  }
}; 