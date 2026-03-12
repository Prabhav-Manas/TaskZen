const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {type:String, required:true, trim:true},
    email: {type:String, required:true, trim:true, unique:true},
    password: {type:String, required:true, trim:true},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now}
})

module.exports = mongoose.model('User', userSchema);