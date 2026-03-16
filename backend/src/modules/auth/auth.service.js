const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {generateToken}=require('../../config/jwt');

const {sendEmail}=require('../../utils/mailer');

const User=require('../user/user.model');

exports.signupService=async(data)=>{
    const {fullname, email, password}=data;

    if(!fullname || !email || !password){
        throw new Error('All fields are required');
    }

    const existingUser=await authRepository.findUserByEmail(email);

    if(existingUser){
        throw new Error('Email already in use');
    }

    const hashedPassword=await bcrypt.hash(password, 12);

    // Generate email verification token
    const verificationToken=crypto.randomBytes(32).toString('hex');

    const user=await authRepository.createUser({
        fullname,
        email,
        password:hashedPassword,
        verificationToken
    })

    // Create verification link
    const verificationLink=`${process.env.FRONTEND_URL || 'http://localhost:8000'}/api/auth/verify-email/${email}/${verificationToken}`;

    // Send verification email
    await sendEmail(user.email, 'Verify Your Email', `<p>Click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`);

    user.password=undefined;

    return user;
}

exports.verifyEmailService=async(email, token)=>{
    const user=await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error('User not found');
    }

    if(user.isVerified){
        throw new Error('Email already verified');
    }

    if(user.verificationToken !== token){
        throw new Error('Invalid verification token');
    }

    const verifiedUser=await authRepository.verifyUser(email);

    return verifiedUser;
}

exports.signinService=async(data)=>{
    const {email, password}=data;
    if(!email || !password){
        throw new Error('All fields are required');
    }

    const user=await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error('Email not found');
    }

    const isPasswordMatch=await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){
        throw new Error('Invalid Credentials');
    }

    // Generate JWT token
    const token=generateToken(user._id);

    user.password=undefined;

    return { user, token };
}

exports.forgotPasswordService=async(data)=>{
    const {email}=data;

    if(!email){
        throw new Error('Email is required');
    }

    const user=await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error('Email not found');
    }

    // Generate OTP
    const resetOtp=Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp=await bcrypt.hash(resetOtp, 12);
    const resetOtpExpiry=Date.now() + 10 * 60 * 1000; // 10 minutes

    await authRepository.saveResetToken(email, null, null, hashedOtp, resetOtpExpiry);

    const html = `
        <p>Use the OTP below to reset your password:</p>
        <h2>${resetOtp}</h2>
        <p>OTP expires in 10 minutes.</p>`;

    await sendEmail(user.email, 'Password Reset OTP', html);

    return true;
}

exports.verifyOtpService=async({email,otp})=>{
    if(!email || !otp){
        throw new Error('Email and OTP are required');
    }

    const user=await authRepository.findUserByEmail(email);

    if(!user || !user.resetOtp){
        throw new Error('Invalid or expired OTP');
    }

    // Check if user is blocked due to too many OTP attempts
    if(user.otpBlockedUntil && user.otpBlockedUntil > Date.now()){
        throw new Error('Too many OTP attempts. Try again later.');
    }

    // Check if OTP is expired
    if (user.resetOtpExpiry < Date.now()) {
        throw new Error('OTP expired');
    }

    const isOtpMatch=await bcrypt.compare(otp, user.resetOtp);

    // Wrong OTP
    if(!isOtpMatch){
        const attempts = user.otpAttempts + 1;

        if(attempts >= 5){
            await User.findByIdAndUpdate(user._id,{
                otpAttempts:0,
                otpBlockedUntil: Date.now() + 10 * 60 * 1000
            });
            
            throw new Error('Too many attempts. OTP blocked for 10 minutes.');
        }

        await User.findByIdAndUpdate(user._id,{
            otpAttempts:attempts
        });

        throw new Error('Invalid OTP');
    }

    // SUCCESS → RESET ATTEMPTS
    await User.findByIdAndUpdate(user._id, {
        otpAttempts: 0,
        otpBlockedUntil: null
    });

    // Otp is correct -> generate reset token
    const resetToken=crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry=Date.now() + 60 * 60 * 1000; // 1 hour

    await authRepository.saveResetToken(email, resetToken, resetTokenExpiry, null, null);

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password/${resetToken}`;

    const html = `<p>Click this link to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
    <p>Link expires in 1 hour.</p>`;

    await sendEmail(user.email, 'Reset Your Password', html);

    return true;
}

exports.resendOtpService = async (email) => {

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('Email not found');
    }

    // Prevent OTP spam
    if (user.resetOtpExpiry && user.resetOtpExpiry > Date.now()) {
        throw new Error('OTP already sent. Please wait before requesting again.');
    }

    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(resetOtp, 12);
    const resetOtpExpiry = Date.now() + 10 * 60 * 1000;

    await authRepository.saveResetToken(email, null, null, hashedOtp, resetOtpExpiry);

    const html = `
        <p>Your new OTP:</p>
        <h2>${resetOtp}</h2>
        <p>Expires in 10 minutes</p>
    `;

    await sendEmail(email, 'Resend OTP', html);

    return true;
};

exports.resetPasswordService=async(data)=>{
    const{token, password}=data;

    if(!token || !password){
        throw new Error('All fields are required');
    }

    const user=await authRepository.findUserByResetToken(token);

    if(!user){
        throw new Error('Invalid or expired reset token');
    }

    const hashedPassword=await bcrypt.hash(password, 12);

    await authRepository.updatePassword(user._id, hashedPassword);

    return true;
}