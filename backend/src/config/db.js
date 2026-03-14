require('dotenv').config();
const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');
    }catch(error){
        console.log('Error connecting to Database:', error);
        process.exit(1);
    }
}

module.exports=connectDB;