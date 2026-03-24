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
const { BrevoClient } = require('@getbrevo/brevo');

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

exports.sendEmail = async (to, subject, html) => {
  try {
    console.log('Brevo API Key present:', !!process.env.BREVO_API_KEY);

    const result = await brevo.transactionalEmails.sendTransacEmail({
      to: [{ email: to }],
      sender: { email: process.env.EMAIL_FROM, name: 'TaskZen' },
      subject,
      htmlContent: html,
    });

    console.log('Email sent successfully:', result);
    return result;

  } catch (error) {
    console.error('Send email failed:', error.message);
    throw new Error('Failed to send email');
  }
};