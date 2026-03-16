const express=require('express');
const authController=require('./auth.controller');
const {authLimiter}=require('../../middleware/rateLimiter');

const router=express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authLimiter, authController.signin);
router.post('/refresh-token', authController.refreshToken);
router.get('/verify-email/:email/:token', authController.verifyEmail);
router.post('/forgot-password', authLimiter, authController.forgotPassword);
router.post('/verify-otp', authLimiter, authController.verifyOtp);
router.post('/resend-otp', authLimiter, authController.resendOtp);
router.post('/reset-password/:token', authController.resetPassword);

module.exports=router;