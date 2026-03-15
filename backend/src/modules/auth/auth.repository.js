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
        {new:true}
    )
}

exports.saveResetToken=(email, token, expiry)=>{
    return User.findOneAndUpdate(
        {email},
        {resetToken:token, resetTokenExpiry:expiry},
        {new:true}
    )
}

exports.findUserByResetToken=async(token)=>{
    return await User.findOne({
        resetToken:token,
        resetTokenExpiry:{$gt:Date.now()}
    });
}

exports.updatePassword=async(userId, hashedPassword)=>{
    return await User.findByIdAndUpdate(
        userId,
        {password:hashedPassword, resetToken:null, resetTokenExpiry:null},
        {new:true}
    )
}