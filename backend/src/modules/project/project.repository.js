const Project=require('../project/project.model');

exports.findProjectById=async(projectId)=>{
    return await Project.findById(projectId).populate('members', 'fullname email');
}