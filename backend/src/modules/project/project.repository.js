const Project=require('../project/project.model');

exports.findProjectById=async(projectId)=>{
    return await Project.findById(projectId).populate('members', 'fullname email');
}

exports.updateProjectById=async(projectId, data)=>{
    return await Project.findByIdAndUpdate(projectId, {$set:data}, {new:true, runValidators:true}).populate('members', 'fullname email')
}

exports.deleteProjectById=async(projectId)=>{
    return await Project.findByIdAndDelete(projectId);
}