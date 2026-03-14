const User=require('../user/user.model');

exports.findUserByEmail=(email)=>{
    return User.findOne({email});
}

exports.createUser=(userData)=>{
    return User.create(userData);
}