const logger = require("../../helpers/logger");
const { Account } = require("../../models/Account");

const AddAcountSequelizer = ({ account_number, user_id, ifsc_code, loans, lastThrityDayTransactions, loggerPrefix }) => {
    try {
        logger.info(`${loggerPrefix} - Started Account Creation`);
        const account = Account.create({
            account_number,
            user_id,
            ifsc_code,
            loans,
            lastThrityDayTransactions: lastThrityDayTransactions
        })
        if (!account) {
            logger.error(`${loggerPrefix} - Account not created`);
            return {
                code: 400,
                message: "Account not created",
                data: {}
            }
        }
        logger.info(`${loggerPrefix} - Account created successfully`);
        return {
            code: 200,
            message: "Account created successfully",
            data: account
        }
    } catch (error) {
        logger.error(`${loggerPrefix} - Error in Account Creation: ${error.message}`);
        return {
            code: 500,
            message: "Internal server error",
            data: {}
        }
    }

}

module.exports = AddAcountSequelizer;