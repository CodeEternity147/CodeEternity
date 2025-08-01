import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email environment variables not configured');
        return;
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } catch (error) {
      console.error('Error initializing email transporter:', error);
    }
  }

  async sendEmail(mailOptions) {
    try {
      if (!this.transporter) {
        throw new Error('Email service not configured');
      }

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendContactFormEmail(formData) {
    const { name, email, parentCategory, childCourse, message, mobile, additionalInfo } = formData;

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'codeeternity.help@gmail.com',
      subject: `New Contact Form Submission - ${parentCategory}`,
      html: `
        <h2>New Query from CodeEternity Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${parentCategory}</p>
        <p><strong>Course:</strong> ${childCourse || 'Not specified'}</p>
        ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ''}
        ${additionalInfo ? `<p><strong>Additional Info:</strong> ${additionalInfo}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    return await this.sendEmail(mailOptions);
  }

  async sendServiceFormEmail(formData) {
    const { name, email, mobile, course, description } = formData;

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'codeeternity.help@gmail.com',
      subject: `New Service Form Inquiry - ${course}`,
      html: `
        <h2>New Service Form Inquiry from CodeEternity Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Description:</strong></p>
        <p>${description}</p>
      `,
    };

    return await this.sendEmail(mailOptions);
  }
}

export default new EmailService(); 