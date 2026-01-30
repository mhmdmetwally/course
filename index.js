require("dotenv").config();
const express=require('express');
const { title } = require('process');
const mongoose = require ('mongoose');
const url=process.env.MONGO_URL
const http_status_text=require('./utils/http_status_text');
const cors=require('cors');

mongoose.connect(url).then(()=>{
    console.log('mongodb server start');
})


const app=express();

app.use(cors());
app.use(express.json());

const coursesRouter = require('./routes/courses.route');
const usersRouter = require('./routes/users.route');

const { error } = require("console");

app.use('/courses',coursesRouter);

app.use('/users',usersRouter);

app.use((req, res) => {
  res.status(404).json({
    status: "FAIL",
    message: "Route not found"
  });
});

app.use((err,req,res,next)=>{
    res.status(err.status_code||500).json({
        status:err.status_text||http_status_text.ERORR,
        message:err.message,
        code:err.status_code || 500
    });
});



app.listen(process.env.port || 4000,()=>{
    console.log('listening on port: 5000');
});
