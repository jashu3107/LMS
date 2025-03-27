const {findUserByPkSequelize, findAccountByPkSequelize, findLoanByIdSequelize} = require("../sequelizeController/index.js");
const {response} = require("../helpers/response.js");
const logger = require("../helpers/logger.js");

const isTheUserEligibleForLoanValidation  = async (req, res, next)=>{
    const loggerPrefix = "isTheUserEligibleForLoanValidation";
    try{
        logger.info("started isTheUserEligibleForLoanValidation");
        const {user_id, account_number} = req.body;
        logger.info(`finding user by id ${user_id} ${account_number}`);
        const user = await findUserByPkSequelize(user_id, loggerPrefix);
        if(user.code === 404 || user.code === 500){
            return response({
                req: req,
                res: res,
                code: user?.code,
                message: user?.message,
                data: user?.data
            });
        }
        logger.info(`user found ${JSON.stringify(user)}`);
        logger.info(`finding account by number ${account_number}`);
        const account = await findAccountByPkSequelize(account_number, loggerPrefix);
        if(account.code === 404 || account.code === 500){
            logger.error(`account not found ${account.code} ${account.message}`);
            return response({
                req: req,
                res: res,
                code: account?.code,
                message: account?.message,
                data: account?.data
            });
        }
        logger.info(`account found ${JSON.stringify(account)}`);
        logger.info(`checking if account belongs to user ${account.data.user_id} ${user.data.user_id}`);
        if(account.data.user_id !== user.data.user_id){
            logger.error(`account does not belong to user ${account.data.user_id} ${user.data.user_id}`);
            return response({
                req: req,
                res: res,
                code: 400,
                message: "Account not found",
                data: null
            });
        }

        // Check pending loans
        logger.info(`loans ${JSON.stringify(user.data.loans)}`);
        let pendingCount = 0;
        
        // Use Promise.all to handle all loan checks concurrently
        if (user.data.loans && user.data.loans.length > 0) {
            const loanChecks = await Promise.all(
                user.data.loans.map(async (loan_id) => {
                    const loanID = parseInt(loan_id);
                    const loan = await findLoanByIdSequelize(loanID, loggerPrefix);
                    
                    if (loan.code === 404 || loan.code === 500) {
                        return response({
                            req: req,
                            res: res,
                            code: loan?.code,
                            message: loan?.message,
                            data: loan?.data
                        });
                    }
                    if (loan.data.loan_status.toLowerCase() !== "closed") {
                        pendingCount++;
                    }
                })
            );

            if (pendingCount >= 2) {
                return response({
                    req: req,
                    res: res,
                    code: 400,
                    message: "User has pending loans",
                    data: null
                });
            }
        }

        next();
    } catch(error) {
        logger.error(`${loggerPrefix} - Error in isTheUserEligibleForLoanValidation: ${error}`);
        return response({
            req: req,
            res: res,
            code: 500,
            message: "Internal server error",
            data: null
        });
    }
}

module.exports = {isTheUserEligibleForLoanValidation};
