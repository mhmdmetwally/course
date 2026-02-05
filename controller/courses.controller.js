const Course=require('../models/course.model');
const express=require('express');
const { title } = require('process');

const {validationResult, query}=require('express-validator');

const app_error=require('../utils/AppError');
const http_status_text=require('../utils/http_status_text');

const { fail } = require('assert');
const { asyncWrapProviders } = require('async_hooks');
const AsyncWrapper = require('../middleware/AsyncWrapper');

const app=express();
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


const getAllCourses= async(req,res)=>{
  //?limit=num&page=num
  const query=req.query;
  const limit=query.limit||10;
  const page=query.page||1;
  const skip=(page-1)*limit;
  const courses=await Course.find({},{"__v":false}).limit(limit).skip(skip);
  res.json({status:http_status_text.SUCCESS,data:{courses}});
}

const getSingleCourse = AsyncWrapper(
  async (req, res,next) => {

    let course_name = req.params.course_name;

    const safeName = escapeRegex(course_name);

    const course = await Course.find({
      title: { $regex: new RegExp(`^${safeName}$`, "i") }
    },{"__v":false});

    if (course.length > 0) {
       res.json({status:http_status_text.SUCCESS,data:{course}});
    } else {
      let message=` ${course_name} course not found!`
      const error = new app_error()
      error.create(message,404,http_status_text.FAIL);
      return next(error);  
    }

  }
)


const addCourse=AsyncWrapper(
  async(req,res,next)=>{
    
    const err=validationResult(req);
    if(!err.isEmpty()){
      const error = new app_error();
      error.create(err.array(),400,http_status_text.FAIL)
      return next(error);
    }

    const newCourse = new Course(req.body);
    await newCourse.save();
    
    const course=await Course.find();
    res.status(201).json({status:http_status_text.SUCCESS,data:{course:course}});
});

const updateCourse=AsyncWrapper(
  async(req,res,next)=>{
     let course_name = req.params.course_name;

    const safeName = escapeRegex(course_name);

    const course = await Course.find({
      title: { $regex: new RegExp(`^${safeName}$`, "i") }
    });

    if(course.length>0)
        return res.status(200).json({status:http_status_text.SUCCESS,data:{updateCourse:course}});
    else{
    let message=` ${course_name} course not found!`
      const error = new app_error()
      error.create(message,404,http_status_text.FAIL);
      return next(error); 
    }
  }
);


const deleteCourse =AsyncWrapper(
   async (req, res,next) => {
    let course_name = req.params.course_name;


    // Escape special characters
    const safeName = escapeRegex(course_name);

    const course = await Course.find({
      title: { $regex: new RegExp(`^${safeName}$`, "i") }
    });


    if (course.length === 0) {
      const error=new app_error();
      let message=`course ${course_name} not avalible`;
      error.create(message,404,http_status_text.FAIL);
      return next(error);
    }

    await Course.deleteOne({ _id: course[0]._id });

    res.status(200).json({status:http_status_text.SUCCESS, data:null });
  }
);

module.exports={
    getAllCourses,
    getSingleCourse,
    addCourse,
    updateCourse,
    deleteCourse
}