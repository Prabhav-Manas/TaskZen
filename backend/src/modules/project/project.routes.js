const express=require('express');
const projectController=require('../project/project.controller');

const authMiddleware=require('../../middleware/auth.middleware');

const router=express.Router();

router.post('/', authMiddleware, projectController.createProject);

module.exports=router;