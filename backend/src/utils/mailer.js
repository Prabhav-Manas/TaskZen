const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: 'TaskZen <onboarding@resend.dev>', // default sender (works without domain)
      to,
      subject,
      html,
    });

    console.log('Email sent:', response?.id);
    return response;

  } catch (error) {
    console.log('Email error:', error.message);
    throw error;
  }
};