const Project=require('../project/project.model');
const User=require('../user/user.model');
const projectRepository=require('../project/project.repository');
const createError=require('http-errors');

const mongoose=require('mongoose')

// Create Project Service
exports.createProjectService=async(data, userId)=>{
    const {name, description, members}=data;

    if(!name || !name.trim()){
        throw new Error('Project name is required');
    }

    const existingProject=await Project.findOne({name:name.trim(), owner:userId});
    
    if(existingProject) throw new Error('Project with same name already exists');

    let memberIds = [];

    // If members are provided
    if (members && members.length > 0) {
        // Validate users exist
        const users = await User.find({ _id: { $in: members } });

        if (users.length !== members.length) {
            throw new Error('Some members are invalid');
        }

        memberIds = users.map(user => user._id);
    }

    // Add owner also as member
    if (!memberIds.includes(userId)) {
        memberIds.push(userId);
    }

    const project=await Project.create({name, description, owner:userId, members:memberIds});

    return project;
}

// Fetch All Projects Service
exports.getAllProjectService=async(userId)=>{
    const project = await Project.find({$or:[
        {owner:userId},
        {members:userId}
    ]}).populate('owner', 'fullname email').populate('members', 'fullname email').sort({createdAt:-1});

    return project;
}

// exports.getAllProjectService = async (userId) => {
//     const project = await Project.find({
//         $or: [
//             { owner: new mongoose.Types.ObjectId(userId) },
//             { members: new mongoose.Types.ObjectId(userId) }
//         ]
//     })
//     .populate('owner', 'fullname email')
//     .populate('members', 'fullname email')
//     .sort({ createdAt: -1 });

//     return project;
// }

// Fecth a Signle Project Service
exports.getSingleProject=async(projectId)=>{
    const project=await projectRepository.findProjectById(projectId);

    if(!project){
        throw createError(404, 'Project not found!');
    }

    return project;
}

exports.updateProject=async(projectId, data)=>{
    const project=await projectRepository.updateProjectById(projectId, data);

    if(!project) throw createError(404, 'Project not found!');

    return project;
}

exports.deleteProjectService=async(projectId)=>{
    const project=await projectRepository.deleteProjectById(projectId);

    if(!project) throw createError(404, 'Project not found!');

    return project;
}