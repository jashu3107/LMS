const {applyLoanSequelizeController} = require("../sequelizeController/index.js");
const {updateLoansInAccountsSequelizeController} = require("../sequelizeController/index.js");
const {updateLoansInUsersSequelizeController} = require("../sequelizeController/index.js");
const {response} = require("../helpers/response.js");
const logger = require("../helpers/logger.js");
const {sequelizer} = require("../config/db.js");

const applyLoanforUserController = async (req, res)=>{
    const loggerPrefix = "applyLoanforUserController";
    const t = await sequelizer.transaction();
    try{
        logger.info(`${loggerPrefix} - Applying loan for user ${req.body.user_id}`);
        const loan = await applyLoanSequelizeController({data: req.body, loggerPrefix: loggerPrefix, transaction: t});
        if(loan.code !== 200){
            return response({
                req: req,
                res: res,
                code: loan?.code,
                message: loan?.message,
                data: loan?.data
            });
        }
        logger.info(`${loggerPrefix} - Loan applied successfully`);
        logger.info(`${loggerPrefix} - updating the loans array in accounts table`);
        const updateLoansInAccounts = await updateLoansInAccountsSequelizeController({data: {account_number: loan.data.account_number, loan_id: loan.data.loan_id}, loggerPrefix: loggerPrefix, transaction: t});
        if(updateLoansInAccounts.code !== 200){
            return response({
                req: req,
                res: res,
                code: updateLoansInAccounts?.code,
                message: updateLoansInAccounts?.message,
                data: updateLoansInAccounts?.data
            });
        }
        logger.info(`${loggerPrefix} - Loans array updated successfully in accounts table`);
        logger.info(`${loggerPrefix} - Updating the users table`);
        const updateLoansInUsers = await updateLoansInUsersSequelizeController({data: {user_id: loan.data.user_id, loan_id: loan.data.loan_id}, loggerPrefix: loggerPrefix, transaction: t});
        if(updateLoansInUsers.code !== 200){
            return response({
                req: req,
                res: res,
                code: updateLoansInUsers?.code,
                message: updateLoansInUsers?.message,
                data: updateLoansInUsers?.data
            });
        }
        await t.commit();
        logger.info(`${loggerPrefix} - All changes made to the accounts table and users table`);
        return response({
            req: req,
            res: res,
            code: 200,
            message: "Loan applied successfully and all changes made to the accounts table and users table",
            data: loan?.data
        });
    }catch(error){
        await t.rollback();
        logger.error(`${loggerPrefix} - Error in applyLoanforUserController. All changes rolled back: ${error}`);
        return response({
            req: req,
            res: res,
            code: 500,
            message: "Internal server error",
            data: null
        });
    }
}

module.exports = {applyLoanforUserController};
