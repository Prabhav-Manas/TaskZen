// const nodemailer=require('nodemailer');

// const transporter=nodemailer.createTransport({
//     service:'Gmail',
//     auth:{
//         user:process.env.EMAIL_USER,
//         pass:process.env.EMAIL_PASS
//     }
// });

// exports.sendEmail=async(to,subject,html)=>{
//     const mailOptions={
//         from:process.env.EMAIL_FROM,
//         to,
//         subject,
//         html,
//         replyTo: process.env.EMAIL_FROM
//     }

//     return transporter.sendMail(mailOptions);
// }


// const sgMail = require('@sendgrid/mail');

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// exports.sendEmail = async (to, subject, html) => {
//   try {
//     const msg = {
//       to,
//       from: process.env.EMAIL_FROM, // must be verified in SendGrid
//       subject,
//       html,
//     };

//     const info = await sgMail.send(msg);
//     console.log('Email sent successfully');
//     return info;
//   } catch (error) {
//     console.error('Send email failed - Message:', error.message);
//     console.error('Send email failed - Code:', error.code);
//     console.error('Send email failed - Response:', JSON.stringify(error.response?.body));
//     throw new Error('Failed to send email');
//   }
// };

// mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

// Verify transporter on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Brevo SMTP connection failed:', error.message);
  } else {
    console.log('Brevo SMTP ready to send emails');
  }
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
    console.error('Send email failed - Message:', error.message);
    console.error('Send email failed - Code:', error.code);

    console.log('BREVO_SMTP_USER:', process.env.BREVO_SMTP_USER);
    console.log('BREVO_SMTP_PASS present:', !!process.env.BREVO_SMTP_PASS);
    console.log('BREVO_SMTP_PASS length:', process.env.BREVO_SMTP_PASS?.length);
    console.log('BREVO_SMTP_PASS value:', process.env.BREVO_SMTP_PASS);

    throw new Error('Failed to send email');
  }
};