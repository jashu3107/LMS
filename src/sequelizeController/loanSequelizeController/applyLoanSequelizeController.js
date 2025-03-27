const {Loan} = require("../../models/associations.js");
const logger = require("../../helpers/logger.js");

const applyLoanSequelizeController = async ({data, loggerPrefix})=>{
    try{
        logger.info(`${loggerPrefix} - in applyLoanSequelizeController for user ${data.user_id}`);
        const loan = await Loan.create({
            loan_id: data.loan_id,
            user_id: data.user_id,
            account_number: data.account_number,
            vendor_id: data.vendor_id,
            loan_amount: data.loan_amount,
            loan_status: "approved",
        })
        if(!loan){  
            logger.error(`${loggerPrefix} - Loan not created`);
            return {
                code: 500,
                message: "Loan not created",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Loan created successfully`);
        return {
            code: 200,
            message: "Loan created successfully",
            data: loan
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error in applyLoanSequelizeController: ${error}`);
        return {
            code: 500,
            message: "Internal server error",
            data: null
        }
    }
}

module.exports = {applyLoanSequelizeController};