require('dotenv').config();
const nodemailer=require('nodemailer');

const sendEmailVerification=async(email,verificationLink)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });

        const mailOptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Email Verification',
            html:`<p>Please click the following link to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`
        }

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    }catch(error){
        console.log('Error sending verification email:', error);
    }
}

const sendPasswordResetEmail=async(email, resetLink)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });

        const mailOptions={
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Password Reset',
            html:`<p>Please click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
        }

        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent to:', email);
    }catch(error){
        console.log('Error sending password reset email:', error);
    }    
}
module.exports={sendEmailVerification, sendPasswordResetEmail};