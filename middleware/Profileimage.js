const multer = require('multer');
const app_error = require('../utils/AppError');
const http_status_text = require('../utils/http_status_text');
const disk_storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        const ext=file.mimetype.split('/')[1];
        const file_name=`user-${Date.now()}.${ext}`;
        cb(null,file_name);
    }
});
const fileFilter = (req,file,cb)=>{
    const image_type = file.mimetype.split('/')[0];

    if(image_type=='image')
        return cb(null,true);
    const error=new app_error();
    error.create('file must be image',400,http_status_text.FAIL);
    return cb(error,false);
}

const upload = multer({
    storage:disk_storage,
    fileFilter

})
module.exports = upload;