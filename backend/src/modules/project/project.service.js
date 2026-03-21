const Project=require('../project/project.model');
const User=require('../user/user.model');

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