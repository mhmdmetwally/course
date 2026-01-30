const express=require('express');

const router=express.Router();

const usersController=require('../controller/users.controller');

router.route('/')
    .get(usersController.getAllusers)

router.route('/register')
    .post(usersController.register)

router.route('/login')
    .post(usersController.login)


module.exports= router;
