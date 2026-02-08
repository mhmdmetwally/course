const app_error = require("../utils/AppError");
const http_status_text=("../utils/http_status_text");
module.exports =(...allowedroles)=>{
    
    return (req,res,next)=>{
         const cur_role = req.user.role;
        if (allowedroles.includes(cur_role)) {
            return next();
        }

        const error = new app_error();
        error.create(
            `${cur_role} not allowed to make this method`,
            403,
            http_status_text.FAIL
        );
        return next(error);
    };
}
