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

exports.verifyEmail=async(req,res,next)=>{
    try{
        const {email, token}=req.params;

        await authService.verifyEmailService(email, token);

        res.status(200).json({
            status:200,
            message:'Email verified successfully',
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

exports.forgotPassword=async(req,res,next)=>{
    try{
        await authService.forgotPasswordService(req.body);

        res.status(200).json({
            status:200,
            message:'Password reset email sent successfully',
        })
    }catch(error){
        next(error);
    }
}

exports.resetPassword=async(req,res,next)=>{
    try{
        const data={
            token:req.params.token,
            password:req.body.password,
        }

        await authService.resetPasswordService(data);

        res.status(200).json({
            status:200,
            message:'Password reset successfully',
        })
    }catch(error){
        next(error);
    }
}