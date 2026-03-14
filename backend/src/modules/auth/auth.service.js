const bcrypt=require('bcryptjs');
const authRepository=require('./auth.repository');
const {generateToken}=require('../../config/jwt');

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

    const user=await authRepository.createUser({
        fullname,
        email,
        password:hashedPassword
    })

    user.password=undefined;

    return user;
}

exports.verifyEmailService=async()=>{}

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