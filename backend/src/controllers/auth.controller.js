require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const {sendEmailVerification} = require('../utils/mailer');

// Sign up controller
exports.signup=async(req, res)=>{
    try{
        const {fullname, email, password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({status:400, message: 'All fields are required'});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({status:400, message: 'Email already exists'});
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullname,
            email,
            password: hashPassword
        });

        // Generate email verification token and save it to the user document
        const verificationToken=crypto.randomBytes(32).toString('hex');
        newUser.verificationToken=verificationToken;
        newUser.isVerified=false;

        await newUser.save();

        // Send verification email to the user
        const verificationLink = `http://localhost:8000/auth/verify-email/${email}/${verificationToken}`;
        await sendEmailVerification(newUser.email, verificationLink);

        res.status(201).json({status:201, message: 'User created successfully'});
    }catch(error){
        console.log('Error in signup:', error);
        res.status(500).json({status:500, message: 'Internal server error'});
    }
};

// Email verification controller
exports.verifyEmail=async(req,res)=>{
    try{
        const {email, token} = req.params;

        const user = await User.findOne({email, verificationToken: token});

        if(!user){
            return res.status(400).json({status:400, message: 'Invalid verification link'});
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        await user.save();

        // res.status(200).json({status:200, message: 'Email verified successfully'});
        return res.redirect('http://localhost:4200/auth/signin?verified=true');
    }catch(error){
        console.log('Error in email verification:', error);
        res.status(500).json({status:500, message: 'Internal server error'});
    }
}

// Sign in controller
exports.signin=async(req,res)=>{
    try{
        const {email, password} = req.body;
        // console.log('Body received:=>', req.body);

        if(!email || !password){
            return res.status(400).json({status:400, message: 'Email and password are required'});
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({status:400, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({status:400, message: 'Invalid email or password'});
        }

        const payload = {
            id: user._id,
            email: user.email,
            fullname: user.fullname
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({status:200, message: 'Signin successful', token});
    }catch(error){
        console.log('Error in signin:', error);
        res.status(500).json({status:500, message: 'Internal server error'});
    }
}