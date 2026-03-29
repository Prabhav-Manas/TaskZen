const projectService=require('../project/project.service');


// Create Project Controller
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

// Fetch All Projects Controller
exports.getProjects=async(req, res, next)=>{
    try{
        const userId=req.user.id;

        const projects=await projectService.getAllProjectService(userId);

        res.status(200).json({
            status:200,
            message:'All projects fetched!',
            projects
        })
    }catch(error){
        next(error)
    }
}

exports.fetchSingleProject=async(req, res, next)=>{
    try{
        const project=await projectService.getSingleProject(req.params.id);

        res.status(200).json({
            status:200,
            message:'Project Fetched!',
            project:project
        })
    }catch(error){
        next(error)
    }
}