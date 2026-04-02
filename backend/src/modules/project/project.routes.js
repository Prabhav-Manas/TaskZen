const express=require('express');
const projectController=require('../project/project.controller');

const authMiddleware=require('../../middleware/auth.middleware');

const router=express.Router();

router.post('/', authMiddleware, projectController.createProject);
router.get('/', authMiddleware, projectController.getProjects);
router.get('/:id', authMiddleware, projectController.fetchSingleProject)
router.patch('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports=router;