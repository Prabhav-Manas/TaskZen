const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup=async(req, res)=>{
    try{
        const {fullname, email, password} = req.body;

        if(!fullname || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            fullname,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User created successfully'});
    }catch(error){
        res.status(500).json({message: 'Internal server error'});
    }
};

exports.signin=async(req,res)=>{
    try{
        
    }catch(error){

    }
}