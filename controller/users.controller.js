const http_status_text = require('../utils/http_status_text');
const Users = require('../models/user.model');
const AsyncWrapper = require('../middleware/AsyncWrapper');
const {validationResult, query}=require('express-validator');
const app_error = require('../utils/AppError');
const bcrypt = require('bcrypt');
const salt_round=Number(process.env.salt_rounds); 
const gen_token=require('../utils/gen_token');
const getAllusers = AsyncWrapper
(
    async(req,res)=>{
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;
        const users = await Users.find({},{"__v":false,password:false}).limit(limit).skip(skip);
        res.json({
            status : http_status_text.SUCCESS,
            data : { users }
    });
})
const register = AsyncWrapper
(
    async(req,res,next)=>{
        const {firstName,lastName,email,password} = req.body;
         const err=validationResult(req);
        if(!err.isEmpty()){
            const error = new app_error();
            error.create(err.array(),400,http_status_text.FAIL)
            return next(error);
        }
        const cur_user=await Users.findOne({email: email});
        if(cur_user)
        {
            let message=` ${cur_user.email} already exist!`
            const error = new app_error()
            error.create(message,404,http_status_text.FAIL);
            return next(error); 
        }
        const hashed_password = await bcrypt.hash(password,salt_round);
        const user = new Users({
            firstName,
            lastName,
            email,
            password:hashed_password
        });
        
        //gen token
        const payload={
            email:user.email,
            id:user._id
        };
        const token = await gen_token(payload);
        user.token=token;
        await user.save();
        res.status(201).json({
            status : http_status_text.SUCCESS,
            data : { user : user }}
        );
    }
)
const login = AsyncWrapper
(
    async(req,res,next)=>{
        const {email,password}=req.body;
        if(!email || !password)
        {
            let message=`email and password are required`
            const error = new app_error()
            error.create(message,404,http_status_text.FAIL);
            return next(error); 
        }

        const user = await Users.findOne({email:email});
        const matched_password = await bcrypt.compare(password,user.password);
        if(user && matched_password)
        {
            const payload={
                email:user.email,
                id:user._id
            };
            user.token = await gen_token(payload);
            console.log(user.token);
            return res.json({
                status:http_status_text.SUCCESS,
                data:{token:user.token}
            })
        }
        else{
            let message=`email or password are wrong`
            const error = new app_error()
            error.create(message,500,http_status_text.ERORR);
            return next(error); 
        }

})

module.exports = {
    getAllusers,
    register,
    login
}