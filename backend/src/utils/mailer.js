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


const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

exports.sendEmail = async (to, subject, html) => {
  try {
    const sendSmtpEmail = {
      sender: {
        email: process.env.EMAIL_FROM,
        name: "TaskZen"
      },
      to: [{ email: to }],
      subject,
      htmlContent: html
    };

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent:", response.messageId);
    return response;

  } catch (error) {
    console.log("Send email failed:", error);
    throw new Error("Failed to send email");
  }
};