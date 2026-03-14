const authService=require('./auth.service');

exports.signup=async(req,res,next)=>{
    try{
        const user=await authService.signupService(req.body);

        res.status(201).json({
            status:201,
            message:'User created successfully',
            user        
        })
    }catch(error){
        next(error);
    }
}

exports.signin=async(req,res,next)=>{
    try{
        const user=await authService.signinService(req.body);

        res.status(200).json({
            status:200,
            message:'User signed in successfully',
            user,
        })
    }catch(error){
        next(error);
    }
}