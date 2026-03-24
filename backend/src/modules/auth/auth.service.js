require('dotenv').config();
const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {generateAccessToken, generateRefreshToken}=require('../../config/jwt');
const jwt=require('jsonwebtoken');
const {sendEmail}=require('../../utils/mailer');

const User=require('../user/user.model');

const blacklistRepository=require('../auth/blacklist/blacklist.repository');

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
    const verificationLink=`${process.env.FRONTEND_URL}/auth/verify-email/${email}/${verificationToken}`;

    // Send verification email
    // try{
    //     await sendEmail(user.email, 'Verify Your Email', `<p>Click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`);
    // }catch(error){
    //     console.log('Email error:', error.message);
    // }

    sendEmail(
        user.email,
        'Verify Your Email',
        `<p>Click the link below to verify your email:</p><a href="${verificationLink}">Verify Email</a>`
    )
  .then(() => console.log('Email sent'))
  .catch(err => console.log('Email failed:', err.message));

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

exports.resendVerificationEmailService = async (email) => {
  const user = await authRepository.findUserByEmail(email);

  if (!user) throw new Error('User not found');

  if (user.isVerified) throw new Error('Email already verified');

  const verificationToken = crypto.randomBytes(32).toString('hex');

  await User.findByIdAndUpdate(user._id, { verificationToken, updatedAt: Date.now() });

  const link = `${process.env.FRONTEND_URL}/auth/verify-email/${email}/${verificationToken}`;

  const html = `
    <h3>Please verify your email:</h3>
    <a href="${link}" style="padding:10px 15px; background:#0d6efd; color:white; text-decoration:none;">Verify Email</a>
    <p>This link will expire soon.</p>
  `;

  await sendEmail(email, 'Verify Email', html);

  return true;
};

exports.signinService=async(data)=>{
    const {email, password}=data;
    if(!email || !password){
        throw new Error('All fields are required');
    }

    const user=await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error('Email not found');
    }

    // if(!user.isVerified){
    //     throw new Error('Please verify your email first');
    // }

    // Reset block if expired
    if (user.signInBlockedUntil && user.signInBlockedUntil < Date.now()) {
        await User.findByIdAndUpdate(user._id, {
            signInAttempts: 0,
            signInBlockedUntil: null
        });
    }

    // Block check
    if(user.signInBlockedUntil && user.signInBlockedUntil > Date.now()){
        throw new Error('Too many failed attempts. Try again later.');
    }

    const isPasswordMatch=await bcrypt.compare(password, user.password);

    if(!isPasswordMatch){

        const attempts = user.signInAttempts + 1;

        if(attempts >= 5){

            await User.findByIdAndUpdate(user._id,{
                signInAttempts:0,
                signInBlockedUntil: Date.now() + 15*60*1000
            });

            throw new Error('Too many login attempts. Try again after 15 minutes.');
        }

        await User.findByIdAndUpdate(user._id,{
            signInAttempts:attempts
        });

        throw new Error('Invalid credentials');
    }

    await User.findByIdAndUpdate(user._id,{
        signInAttempts:0,
        signInBlockedUntil:null
    });

    // Generate JWT token
    const accessToken=generateAccessToken(user._id);
    const refreshToken=generateRefreshToken(user._id);

    await User.findByIdAndUpdate(user._id,{refreshToken});

    user.password=undefined;

    return { user, accessToken, refreshToken };
}

exports.refreshTokenService=async(token)=>{
    if(!token){
        throw new Error('Refresh token required.');
    }

    const decoded=jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user=await User.findById(decoded.id);

    if(!user || user.refreshToken !== token){
        throw new Error('Invalid refresh token');
    }

    const newAccessToken=generateAccessToken(user._id);

    return newAccessToken;
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

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/auth/reset-password/${resetToken}`;

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
    // if (user.resetOtpExpiry && user.resetOtpExpiry > Date.now()) {
    //     throw new Error('OTP already sent. Please wait before requesting again.');
    // }

    const cooldown = 30 * 1000;

    if (user.resetOtpRequestedAt && (Date.now() - user.resetOtpRequestedAt < cooldown)) {
        throw new Error('Please wait before requesting another OTP');
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

    // Check against current password
    const isSameAsCurrent = await bcrypt.compare(password, user.password);
    if (isSameAsCurrent) {
        throw new Error('New password cannot be same as current password');
    }

    // Check last 2 passwords
    if (user.passwordHistory && user.passwordHistory.length > 0) {
        for (let oldPassword of user.passwordHistory.slice(-2)) {
            const isMatch = await bcrypt.compare(password, oldPassword);
            if (isMatch) {
                throw new Error('You cannot reuse your last 2 passwords');
            }
        }
    }

    const hashedPassword=await bcrypt.hash(password, 12);

    // Push current password to history
    const updatedHistory = [...(user.passwordHistory || []), user.password];

    // Keep only last 2 passwords
    const trimmedHistory = updatedHistory.slice(-2);

    await authRepository.updatePassword(user._id, hashedPassword, trimmedHistory);

    return true;
}

exports.logoutService=async(token)=>{
    if(!token){
        throw new Error('Token required.');
    }

    const decoded=jwt.verify(token, process.env.JWT_SECRET);

    const expiresAt = new Date(decoded.exp * 1000);

    await blacklistRepository.addToken(token, expiresAt);

    return true;
}