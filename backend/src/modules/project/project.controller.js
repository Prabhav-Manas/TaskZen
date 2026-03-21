const projectService=require('../project/project.service');

exports.createProject=async(req, res, next)=>{
    try{
        const userId=req.user.id;

        const project=await projectService.createProjectService(req.body, userId);

        res.status(201).json({
            status:201,
            message:'Project created successfully!',
            project
        })
    }catch(error){
        next(error)
    }
}