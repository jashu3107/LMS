const  logger  = require("../../helpers/logger.js");
const {Users} = require("../../models/associations.js");

const findUserByPkSequelize = async (user_id, loggerPrefix)=>{
    try{
        logger.info(`${loggerPrefix} - Finding user with id ${user_id}`);
        const user = await Users.findByPk(user_id);
        if(!user){
            logger.error(`${loggerPrefix} - User with id ${user_id} not found`);
            return {
                code: 404,
                message: "User not found",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - User with id ${user_id} found`);
        return {
            code: 200,
            message: "User found",
            data: user
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error finding user with id ${user_id}`);
        return {
            code: 500,
            message: "Internal server error",
            data: null
        }
    }
}

module.exports = {findUserByPkSequelize};