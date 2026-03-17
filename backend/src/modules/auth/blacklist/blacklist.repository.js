const BlacklistedToken=require('../blacklist/blacklist.model');

exports.addToken=async(token, expiresAt)=>{
    return await BlacklistedToken.create({
        token,
        expiresAt
    })
}

exports.isBlacklisted=async(token)=>{
    return await BlacklistedToken.findOne({token});
}