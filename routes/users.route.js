const express=require('express');

const router=express.Router();

const usersController=require('../controller/users.controller');
const validation=require('../middleware/validation-schema');

router.route('/')
    .get(usersController.getAllusers)

router.route('/register')
    .post(validation.validation_user(),usersController.register)

router.route('/login')
    .post(usersController.login)


module.exports= router;
