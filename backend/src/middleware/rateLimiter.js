const rateLimiter=require('express-rate-limit');

exports.authLimiter=rateLimiter({
    windowMs:15 * 60 * 1000, //15 minutes
    max:50, //limit each IP to 50 requests per windowMs
    message:{
        status:429,
        message:'Too many requests, pleae try again later.'
    },
    standardHeaders:true, //Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, //Disable the `X-RateLimit-*` headers
})


// [NOTE]:=> Now each IP can only make 50 requests in 15 minutes.