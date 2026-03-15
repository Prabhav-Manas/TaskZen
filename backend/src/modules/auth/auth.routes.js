const express=require('express');
const authController=require('./auth.controller');

const router=express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/verify-email/:email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports=router;