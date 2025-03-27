const {Users} = require("../../models/Users.js");
const logger = require("../../helpers/logger.js");

const updateLoansInUsersSequelizeController = async ({data, loggerPrefix, transaction})=>{
    try{
        logger.info(`${loggerPrefix} - Getting the user instance`);
        const instance = await Users.findByPk(data.user_id, {transaction: transaction});
        if(!instance){
            logger.error(`${loggerPrefix} - User not found`);
            return {
                code: 404,
                message: "User not found",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - User found`);
        const updatedLoans = [...instance.loans, String(data.loan_id)];
        logger.info(`${loggerPrefix} - Updating the loans array in users table`);
        const updatedInstance = await Users.update({loans: updatedLoans},{where: {user_id: data.user_id}}, {transaction: transaction});
        if(updatedInstance[0] === 0 || updatedInstance[0] === null){
            logger.error(`${loggerPrefix} - Failed to update the loans array in users table`);
            return {
                code: 500,
                message: "Failed to update the loans array in users table",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Loans updated in users table`);
        return {
            code: 200,
            message: "Loans updated in users table",
            data: updatedLoans
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error in updateLoansInUsersSequelizeController: ${error}`);
        return {
            code: 500,
            message: "Error in updateLoansInUsersSequelizeController",
            data: null
        }
    }
}

module.exports = {updateLoansInUsersSequelizeController};
