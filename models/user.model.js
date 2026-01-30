const mongoose = require('mongoose');
const validator = require('validator');
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
        validate : [validator.isEmail , 'filed must be a vaild email']
    },
    password:{
        type : String,
        required : true,
    }

})

module.exports = mongoose.model('User',user_sechema);