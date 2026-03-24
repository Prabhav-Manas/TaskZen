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


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',                  // literally the string 'apikey'
    pass: process.env.SENDGRID_API_KEY
  }
});

console.log('SendGrid key loaded:', !!process.env.SENDGRID_API_KEY);

exports.sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Send email failed:', error);

    console.error('Send email failed - Message:', error.message);
    console.error('Send email failed - Code:', error.code);
    console.error('Send email failed - Response:', error.response?.body);

    throw new Error('Failed to send email');
  }
};