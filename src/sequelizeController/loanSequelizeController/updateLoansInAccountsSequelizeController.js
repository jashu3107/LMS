const {Account} = require("../models/Account.js");
const logger = require("../helpers/logger.js");

const updateLoansInAccountsSequelizeController = async ({data, loggerPrefix, transaction})=>{
    try{
        logger.info(`${loggerPrefix} - Getting the account instance`);
        const instance = await Account.findByPk(data.account_number, {transaction: transaction});
        if(!instance){
            logger.error(`${loggerPrefix} - Account not found`);
            return {
                code: 404,
                message: "Account not found",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Account found`);
        const updatedLoans = [...instance.loans, String(data.loan_id)];
        logger.info(`${loggerPrefix} - Updating the loans array in accounts table`);
        const updatedInstance = await Account.update({loans: updatedLoans},{where: {account_number: data.account_number}, transaction: transaction});
        if(updatedInstance[0] === 0 || updatedInstance[0] === null){
            logger.error(`${loggerPrefix} - Failed to update the loans array in accounts table`);
            return {
                code: 500,
                message: "Failed to update the loans array in accounts table",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Loans updated in accounts table`);
        return {
            code: 200,
            message: "Loans updated in accounts table",
            data: updatedLoans
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error in updateLoansInAccountsSequelizeController: ${error}`);
        return {
            code: 500,
            message: "Error in updateLoansInAccountsSequelizeController",
            data: null
        }
    }
}

module.exports = {updateLoansInAccountsSequelizeController};