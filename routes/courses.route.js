const express=require('express');

const router=express.Router();

const courseController=require('../controller/courses.controller');

const validation = require('../middleware/validation-schema');
const { version } = require('mongoose');
const verify_token = require('../middleware/verifyToken');
const ALlowed_Tool = require('../middleware/ALlowed_Tool');
const user_role = require('../utils/User_Roles');

router.route('/')
    .get(verify_token,courseController.getAllCourses)
    .post(
        verify_token,
        ALlowed_Tool(user_role.ADMIN,user_role.MANAGER),
        validation.validation_course(),
        courseController.addCourse
    );

router.route('/:course_name')
    .get(verify_token,courseController.getSingleCourse)
    .patch(verify_token,
        ALlowed_Tool(user_role.ADMIN,user_role.MANAGER),
        courseController.updateCourse)
    .delete(verify_token,
        ALlowed_Tool(user_role.ADMIN,user_role.MANAGER),
        courseController.deleteCourse
    );

module.exports= router;
