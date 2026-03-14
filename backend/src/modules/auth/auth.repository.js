const User=require('../user/user.model');

exports.findUserByEmail=(email)=>{
    return User.findOne({email});
}

exports.verifyUser=(email)=>{
    return User.findOneAndUpdate(
        {email},
        {isVerified:true, verificationToken:null},
        {new:true}
    )
}

exports.createUser=(userData)=>{
    return User.create(userData);
}