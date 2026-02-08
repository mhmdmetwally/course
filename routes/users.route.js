const express=require('express');

const router=express.Router();

const usersController=require('../controller/users.controller');
const validation=require('../middleware/validation-schema');
const upload=require('../middleware/Profileimage');
router.route('/')
    .get(usersController.getAllusers)

router.route('/register')
    .post(upload.single('avatar'),validation.validation_user(),usersController.register)

router.route('/login')
    .post(usersController.login)


module.exports= router;
