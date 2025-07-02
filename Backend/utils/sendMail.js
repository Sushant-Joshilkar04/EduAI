const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const sendVerificationEmail = async (userEmail, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' } 
  );

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,       
      pass: process.env.MAIL_PASS        
    }
  });

  const mailOptions = {
    from: '"EduAI " <no-reply@eduai.com>',
    to: userEmail,
    subject: "Verify your Email - EduAI",
    html: `
      <p>Welcome to EduAI!</p>
      <p>Please verify your email by clicking below:</p>
      <a href="${verificationUrl}">Verify Email</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
