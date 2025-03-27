const {Account} = require("../../models/associations.js");
const logger = require("../../helpers/logger.js");

const findAccountByPkSequelize = async (account_number, loggerPrefix)=>{
    try{
        logger.info(`${loggerPrefix} - Finding account with number ${account_number}`);
        const account = await Account.findByPk(account_number);
        if(!account){
            logger.error(`${loggerPrefix} - Account with number ${account_number} not found`);
            return {
                code: 404,
                message: "Account not found",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Account with number ${account_number} found`);
        return {
            code: 200,  
            message: "Account found",
            data: account
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error finding account with number ${account_number}`);
        return {
            code: 500,
            message: "Internal server error",
            data: null
        }
    }
}

module.exports = {findAccountByPkSequelize};
