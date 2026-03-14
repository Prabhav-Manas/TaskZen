exports.errorHandler=(error, req, res, next)=>{
    console.log(error);

    res.status(500).json({
        status:500,
        message:error.message || 'Internal Server Error'
    })
}