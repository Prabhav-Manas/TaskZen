const User=require('../user/user.model');

exports.getAllUsersService=async(currentUserId)=>{
    const users=await User.find(
        {_id:{$ne:currentUserId}}, 'fullname, email'
    );
    return users;
}