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
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: 'TaskZen <onboarding@resend.dev>', // free tier default sender
      to,
      subject,
      html,
    });
    console.log('Email sent:', data.id);
    return data;
  } catch (error) {
    console.error('Send email failed:', error.message);
    throw new Error('Failed to send email');
  }
};