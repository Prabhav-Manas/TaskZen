const mongoose=require('mongoose');

const blackListSchema=new mongoose.Schema({
    token:{type:String, required:true},
    expiresAt:{type:Date, required:true},
}, {timestamps:true})

blackListSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

module.exports=mongoose.model('BlacklistedToken', blackListSchema);