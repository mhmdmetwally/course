const express=require('express');

const router=express.Router();

const courseController=require('../controller/courses.controller');

const validation = require('../middleware/validation-schema');
const { version } = require('mongoose');
const verify_token = require('../middleware/verifyToken');

router.route('/')
    .get(verify_token,courseController.getAllCourses)
    .post,(verify_token,validation.validation_course(),courseController.addCourse);

router.route('/:course_name')
    .get(courseController.getSingleCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports= router;
