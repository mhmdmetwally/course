const mongoose = require('mongoose');
const validator = require('validator');
const user_role = require('../utils/User_Roles');
const user_sechema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    lastName:{
        type : String,
        required : true
    },
    email:{
        type : String,
        unique : true,
        required : true,
        validate : [validator.isEmail , 'faild must be a vaild email']
    },
    password:{
        type : String,
        required : true,
    },
    token:{
        type : String
    },
    role:{
        type: String,
        enum:[user_role.USER,user_role.MANAGER,user_role.ADMIN],
        default: user_role.USER,
    },
    avatar:{
        type:String,
        default:'uploads/profile.png'
    }

})

module.exports = mongoose.model('User',user_sechema);