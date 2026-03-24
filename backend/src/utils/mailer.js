const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

exports.sendEmail=async(to,subject,html)=>{
    const mailOptions={
        from:process.env.EMAIL_FROM,
        to,
        subject,
        html,
        replyTo: process.env.EMAIL_FROM
    }

    return transporter.sendMail(mailOptions);
}