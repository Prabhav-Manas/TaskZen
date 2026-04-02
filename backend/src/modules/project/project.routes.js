const express=require('express');
const projectController=require('../project/project.controller');

const authMiddleware=require('../../middleware/auth.middleware');

const router=express.Router();

router.post('/', authMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getProjects);
router.get('/:id', authMiddleware, projectController.fetchSingleProject)
router.patch('/:id', projectController.updateProject);

module.exports=router;