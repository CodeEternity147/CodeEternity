import nodemailer from 'nodemailer';

export const sendEmail = async (req, res) => {
  const { name, email, parentCategory, childCourse, message } = req.body;

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address from .env
      pass: process.env.EMAIL_PASS, // Your Gmail password or App Password from .env
    },
  });

  // Set up email data
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'codeeternity.help@gmail.com', // The recipient's email address
    subject: `New Contact Form Submission - ${parentCategory}`,
    html: `
      <h2>New Query from CodeEternity Website</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Category:</strong> ${parentCategory}</p>
      <p><strong>Course:</strong> ${childCourse}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};


