const jwt=require('jsonwebtoken');
const blacklistRepository=require('../modules/auth/blacklist/blacklist.repository');

module.exports=async(req,res,next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                status:401,
                message:'Unauthorized'
            })
        }

        const token=authHeader.split(" ")[1];

        // Check blacklist
        const blacklisted=await blacklistRepository.isBlacklisted(token);

        if(blacklisted){
            return res.status(401).json({
                status:401,
                message:'Token revoked. Please sign in again.'
            })
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);

        req.user=decoded;

        next();
    }catch(error){
        return res.status(401).json({
            status:401,
            message:'Invalid token.'
        })
    }
}