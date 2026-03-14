const express=require('express');
const authController=require('./auth.controller');

const router=express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/verify-email/:email/:token', authController.verifyEmail);

module.exports=router;