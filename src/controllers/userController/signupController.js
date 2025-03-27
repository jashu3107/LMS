const { signupSequelizer } = require("../../sequelizeController/userSequelizer/signupSequelizer.js");
const  logger  = require("../../helpers/logger.js");
const { response } = require("../../helpers/response.js");
const bcrypt = require("bcrypt");


const signupController = async (req, res) => {
    try {
        console.log("----------------------------------hhhhhhhhhhhh-----------------")
        const {user_id, first_name, last_name, email, phone_number , password} = req.body;
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const data = {
            user_id,
            first_name,
            last_name,
            email,
            password: hashPassword,
            phone_number,
            loans : [],
            loan_flag : false
        };
        const loggerprefix = "signupController  -[UserID]";
        console.log(req.body);
        const result = await signupSequelizer({ data, loggerprefix });
        console.log(req.body);
        return response({
            req: req,
            res: res,
            code: result?.code,
            message: result?.message,
            data: result?.data
        });
    } catch (err) {
        console.log("error in the signupController");
        logger.error(err);
        return response({
            req: req,
            res: res,
            code: 500,
            message: "Internal Server Error",
            data: {}
        });
    }
};

module.exports = { signupController };