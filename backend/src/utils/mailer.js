// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT),
//   secure: false, // true only for port 465
//   requireTLS: true,
//   tls: {
//     rejectUnauthorized: false
//   },
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.log("SMTP ERROR:", error);
//   } else {
//     console.log("SMTP READY");
//   }
// });

// exports.sendEmail = async (to, subject, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"TaskZen" <${process.env.EMAIL_FROM}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log('Email sent successfully:', info.messageId);

//     return info;
//   } catch (error) {
//     console.error('Send email failed:', error.message);
//     throw new Error('Failed to send email');
//   }
// };


// utils/mailer.js
// Sends transactional email via Brevo's REST API directly (no SDK dependency,
// avoids version/export mismatches from @getbrevo/brevo).

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

exports.sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error('BREVO_API_KEY is not set in environment variables');
    }
    if (!process.env.EMAIL_FROM) {
      throw new Error('EMAIL_FROM is not set in environment variables');
    }

    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          email: process.env.EMAIL_FROM,
          name: 'TaskZen'
        },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Brevo API error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    console.log('Email sent:', data.messageId);
    return data;

  } catch (error) {
    console.error('Send email failed:', error.message || error);
    throw new Error('Failed to send email');
  }
};