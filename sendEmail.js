const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Configure mail server settings
const transporter = nodemailer.createTransport({
  host: 'your-smtp-server.com', // Replace with your SMTP server
  port: 587, // Common port for SMTP
  secure: false, // True for 465, false for other ports
  auth: {
    user: 'your-email@example.com', // Replace with your SMTP username
    pass: 'your-password' // Replace with your SMTP password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Reusable function to send emails
function sendEmail({ from, to, subject, text, html }, callback) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html
  };

  transporter.sendMail(mailOptions, callback);
}

// Route to handle sending emails
app.post('/send-email', (req, res) => {
  // Email details (extracted from request body or defined here)
  const emailData = {
    from: '"Sender Name" <your-email@example.com>', // Sender address
    to: 'recipient@example.com', // List of recipients
    subject: 'Subject of your email', // Subject line
    text: 'Email body in text', // Plain text body
    html: '<p>Email body in HTML</p>' // HTML body content
  };

  sendEmail(emailData, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Error sending email', error });
    }
    res.status(200).send({ message: 'Email successfully sent', info });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
