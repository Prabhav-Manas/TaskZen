const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {generateToken}=require('../../config/jwt');

const {sendEmail}=require('../../utils/mailer');
const { trusted } = require('mongoose');

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

    // Generate reset token
    const resetToken=crypto.randomBytes(32).toString('hex');

    // Set token expiry (15 minutes)
    const resetTokenExpiry=Date.now() + 15 * 60 *1000;

    await authRepository.saveResetToken(email, resetToken, resetTokenExpiry);

    // Create reset link
    const resetLink=`${process.env.FRONTEND_URL || 'http://localhost:8000'}/api/auth/reset-password/${resetToken}`;

    await sendEmail(user.email, 'Password Reset Request', `<p>Click the link below to reset your password:</p><a href="${resetLink}">Reset Password</a>`);

    return true;
}

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