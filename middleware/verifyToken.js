const jwt=require('jsonwebtoken');
const app_error = require('../utils/AppError');
const JWT_SECRET=process.env.JWT_SECRET;
const http_status_text=require('../utils/http_status_text');
const verify_token=(req,res,next)=>{
    const auth_header=req.headers["Authorization"] || req.headers["authorization"];
    if(!auth_header)
    {
        const err=new app_error();
        const message = "required token";
        err.create(message,401,http_status_text.ERORR);
        return next(err);
    }
    const token = auth_header.split(' ')[1];
    try {
        const decoded_token= jwt.verify(token,JWT_SECRET);    
        req.user=decoded_token.payload;
        next();
    } catch (error) {
        const err=new app_error();
        const message = "invalid token";
        err.create(message,401,http_status_text.ERORR);
        next(err);
    }
}
module.exports = verify_token ;