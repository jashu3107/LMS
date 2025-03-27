const { Loan } = require("../models/Loan.js");
const {logger} = require("../helpers/logger.js");

const updateLoanSequelizeController = async ({ user_id, loan_id ,loggerprefix}) => {
    try {
        logger.info(`${loggerprefix}-updateLoanSequelizeController`)
        logger.info("Started Updating");
        const result = await Loan.findOne({ where: { loan_id: loan_id } });
        
        if (!result) {
            logger.error("Loan not found");
            return {
                code: 404,
                message: "Loan not found",
                data: {}
            };
        }
        logger.info("Loan Found");
       
        if (result.user_id != user_id) {
            logger.error("You are not authorized to update this loan");
            return {
                code: 403,
                message: "You are not authorized to update this loan",
                data: {}
            };
        }
        logger.info("You are authorized to update this loan");
        return {
            code: 200,
            message: "Loan updated successfully",
            data: { }
        };

    } catch(err) {
        logger.error("Internal server error");
        return {
            code: 500,
            message: err?.message || "Internal server error",
            data: {}
        };
    }
};

module.exports = { updateLoanSequelizeController };