const http_status_text = require('../utils/http_status_text');
const Users = require('../models/user.model');
const getAllusers = async(req,res)=>{
    const query = req.query;
    
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const users = await Users.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({
        status : http_status_text.SUCCESS,
        data : { users }
    });
}
const register = ()=>{

}
const login = ()=>{

}

module.exports = {
    getAllusers,
    register,
    login
}