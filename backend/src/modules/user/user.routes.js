const express=require('express');
const authMiddleware=require('../../middleware/auth.middleware');
const userController=require('../user/user.controller');

const router=express.Router();

router.get('/', authMiddleware, userController.getAllUsers);

module.exports=router;