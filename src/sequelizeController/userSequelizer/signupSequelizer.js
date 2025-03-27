const {Users} = require("../../models/Users.js");
const logger = require("../../helpers/logger.js");  // Fixed: Destructure logger from the import

const signupSequelizer = async({data, loggerprefix}) => {
    try {
        logger.info(`${loggerprefix} creating user in database`);
        console.log("--------------------------------------------------------")
        const user = await Users.create({
            user_id : data.user_id,
            first_name : data.first_name,
            last_name : data.last_name,
            email :  data.email,
            password: data.password,
            phone_number : data.phone_number,
            loans : data.loans,
            loan_flag : data.loan_flag
        });
        console.log("------------------------------------",user);
        logger.info(`${loggerprefix} user created successfully`);
        return {
            "code": 200,
            "message": "user created successfully",
            "data": user
        };
    } catch(err) {
        console.log(err)
        logger.error(`${loggerprefix} details already exist`); // Removed optional chaining
        return {
            "code": 500,
            "message": "details already exist",
            "data": err.message
        };
    }
}

module.exports = {
    signupSequelizer
}
