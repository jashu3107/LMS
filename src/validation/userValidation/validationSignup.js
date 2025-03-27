const{body,validationResult} = require('express-validator');
const {response} = require("../../helpers/response.js");

const validationSignup = [
    body('first_name').notEmpty().withMessage('first name is required'),
    body('last_name').notEmpty().withMessage('last name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('email is invalid'),
    body('phone_number').notEmpty().withMessage('phone number is required').isLength({min:10,max:10}).withMessage('phone number must be 10 digits'),
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
];

module.exports = {validationSignup};
