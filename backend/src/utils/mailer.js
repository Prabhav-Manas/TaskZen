const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // true only for port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"TaskZen" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent successfully:', info.messageId);

    return info;
  } catch (error) {
    console.error('Send email failed:', error.message);
    throw new Error('Failed to send email');
  }
};