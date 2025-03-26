const {body,validationResult} = require("express-validator");
const {response} = require("../../utils/responseHandler");
const logger = require("../../config/logger");
const getLoansValidation = [
    body("vendor_id").notEmpty().withMessage("Vendor ID is required").isInt().withMessage("Vendor ID must be an integer").isLength({min: 1}).withMessage("Vendor ID must be at least 1 character long"),
    async (req,res,next) => {
        const errors = validationResult(req);
        if(!req.body.vendor_id){
            return response({
                req,
                res,
                message: "Vendor ID is required",
                code: 400,
                data: []
            })
        }
        if(!errors.isEmpty()){
            return response({
                req,
                res,
                message: errors?.message,
                code: errors?.code,
                data: errors?.data
            })
        }
        next();
    }
]

module.exports = {getLoansValidation};
