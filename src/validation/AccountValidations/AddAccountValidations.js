const { response } = require("../../helpers/response");

const AddAccountValidations = (req, res, next) => {
    const { account_number, user_id, ifsc_code } = req.body;
    console.log(req.body);
    if (!account_number?.trim() || !user_id || !ifsc_code?.trim()) {
        return response({
            req,
            res,
            code: 400,
            message: "All fields are required",
            data: {}
        })
    }
    next();
}

module.exports = AddAccountValidations;
