const {Loan} = require("../../models/associations.js");
const logger = require("../../helpers/logger.js");   

const findLoanByIdSequelize = async (loan_id, loggerPrefix)=>{
    try{
        logger.info(`${loggerPrefix} - Finding loan with id ${loan_id}`);
        const loan = await Loan.findByPk(loan_id);
        if(!loan){
            logger.error(`${loggerPrefix} - Loan with id ${loan_id} not found`);
            return {
                code: 404,
                message: "Loan not found",
                data: null
            }
        }
        logger.info(`${loggerPrefix} - Loan with id ${loan_id} found`);
        return {
            code: 200,
            message: "Loan found",
            data: loan
        }
    }catch(error){
        logger.error(`${loggerPrefix} - Error finding loan with id ${loan_id}`);
        return {
            code: 500,
            message: "Internal server error",
            data: null
        }
    }
}

module.exports = {findLoanByIdSequelize};
