const userService  = require("./user.service");

exports.getAllUsers=async(req, res, next)=>{
    try{
        const userId=req.user.id;

        const users=await userService.getAllUsersService(userId);

        res.status(200).json({
            status:200,
            message:'All users fetched!',
            users
        })
    }catch(error){
        next(error)
    }
}