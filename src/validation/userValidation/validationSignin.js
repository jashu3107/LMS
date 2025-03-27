const {body,validationResult}=require("express-validator");
const {response} = require("../../helpers/response.js");
const validationSignin=[
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return response({
                req:req,
                res:res,
                code:400,
                message:errors,
                data:{}
            });
        }
        next();
    }
]

module.exports={validationSignin};