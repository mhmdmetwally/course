const express=require('express');

const router=express.Router();

const courseController=require('../controller/courses.controller');

const validation=require('../middleware/validation-schema');

router.route('/')
    .get(courseController.getAllCourses)
    .post(validation(),courseController.addCourse);

router.route('/:course_name')
    .get(courseController.getSingleCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports= router;
