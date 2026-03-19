const User=require('../user/user.model');

exports.findUserByEmail=(email)=>{
    return User.findOne({email});
}

exports.createUser=(userData)=>{
    return User.create(userData);
}

exports.verifyUser=(email)=>{
    return User.findOneAndUpdate(
        {email},
        {isVerified:true, verificationToken:null},
        {returnDocument:'after'}
    )
}

exports.saveResetToken=(email, token=null, expiry=null, otp=null, otpExpiry=null)=>{
    const update = {};
    if (token !== undefined) update.resetToken = token;
    if (expiry !== undefined) update.resetTokenExpiry = expiry;
    if (otp !== undefined) update.resetOtp = otp;
    if (otpExpiry !== undefined) update.resetOtpExpiry = otpExpiry;

    return User.findOneAndUpdate({email}, update, { returnDocument: 'after' });
}

exports.findUserByResetToken=async(token)=>{
    return await User.findOne({
        resetToken:token,
        resetTokenExpiry:{$gt:Date.now()}
    });
}

exports.updatePassword=async(userId, hashedPassword, passwordHistory)=>{
    return await User.findByIdAndUpdate(
        userId,
        {password:hashedPassword, passwordHistory: passwordHistory, resetToken:null, resetTokenExpiry:null, resetOtp: null, resetOtpExpiry: null},
        {new:true}
    )
}