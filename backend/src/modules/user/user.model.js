const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullname:{type:String, required:true, trim:true},
    email:{type:String, required:true, unique:true, trim:true, lowercase:true, index:true},
    password:{type:String, required:true, minlength:6},
    role:{type:String, default:'user'},

    isVerified:{type:Boolean, default:false},
    verificationToken:{type:String},

    resetToken:{type:String},
    resetTokenExpiry:{type:Date},

    resetOtp:{type:String},
    resetOtpExpiry:{type:Date},

    otpAttempts:{type:Number, default:0},
    otpBlockedUntil:{type:Date},

    signInAttemptes:{type:Number, default:0},
    signInBlockedUntil:{type:Date},
    
    refreshToken:{type:String}
}, {timestamps:true});

module.exports=mongoose.model('User', userSchema);