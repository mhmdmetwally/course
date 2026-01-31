const {body}=require('express-validator');
const validation_course=()=>{
    return[ 
         body('title').notEmpty().withMessage('title is required')
         .isLength({min:2}).withMessage("title is at least 2 char"), 

         body("price").notEmpty().withMessage("price is required")
    ];
}

const validation_user=()=>{
    return[
        body('firstName').notEmpty().
        withMessage('firstName is required').
        isLength({min:3}).withMessage('firstName at least 3 letters'),
        
        body('lastName').notEmpty().
        withMessage('lastName is required').
        isLength({min:3}).withMessage('lastName at least 3 letters'),

         body('email').notEmpty().
        withMessage('email is required').
        isEmail().withMessage('Invalid email address'),

         body('password').notEmpty().
        withMessage('password is required').
        isLength({min:8}).withMessage('password at least 8 letters')

    ];
}
module.exports={
    validation_course,
    validation_user
}