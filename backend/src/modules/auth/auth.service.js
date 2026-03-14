const bcrypt=require('bcryptjs');
const crypto=require('crypto');
const authRepository=require('./auth.repository');
const {generateToken}=require('../../config/jwt');

const {sendEmail}=require('../../utils/mailer');

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