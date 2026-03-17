const authService=require('./auth.service');

// Sign up controller
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

// Email verification controller
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

// Sign in controller
exports.signin=async(req,res,next)=>{
    try{
        const {user, accessToken, refreshToken}=await authService.signinService(req.body);

        res.status(200).json({
            status:200,
            message:'User signed in successfully',
            user,
            accessToken,
            refreshToken
        })
    }catch(error){
        next(error);
    }
}

exports.refreshToken=async(req, res, next)=>{
    try{
        const {refreshToken}=req.body;

        const token= await authService.refreshTokenService(refreshToken);

        res.status(200).json({
            status:200,
            accessToken:token
        })
    }catch(error){
        next(error);
    }
}

// Forgot password controller
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

// Verify OTP controller
exports.verifyOtp=async(req,res,next)=>{
    try{
        const {email, otp}=req.body;

        await authService.verifyOtpService({email, otp});

        res.status(200).json({
            status:200,
            message:'OTP verified successfully',
        })
    }catch(error){
        next(error);
    }
}

// auth.controller.js
exports.resendOtp = async (req, res, next) => {
    try {

        const { email } = req.body;

        await authService.resendOtpService(email);

        res.status(200).json({
            status: 200,
            message: 'OTP resent successfully'
        });

    } catch (error) {
        next(error);
    }
};

//  Reset password controller
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

// Logout Controller
exports.signout=async(req, res, next)=>{
    try{
        const authHeader=req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                status:401,
                message:'Authorization header missing'
            })
        }

        const token = authHeader.split(" ")[1];

        await authService.logoutService(token);

        res.status(200).json({
            status:200,
            message:'Logged out successfully.'
        })
    }catch(error){
        next(error);
    }
}