const { response } = require('../../helpers/response');
const logger = require('../../helpers/logger');
const Account = require('../../models/Account'); // Make sure to import your Account model
const AddAcountSequelizer = require('../../sequelizeController/AccountsSequelizer/AddAcountSequelizer');


const AddAccountController = async (req, res) => {
    const loggerPrefix = "AddAccountController";
    const { account_number, user_id, ifsc_code, loans = [] } = req.body;
    
    try {
        // Get file path if a file was uploaded
        console.log(req.body)
        logger.info(`${loggerPrefix} - Started Account Creation`);
        let transactionsFilePath = null;
        if (req.file) {
            logger.info(`${loggerPrefix} - File Path received`);
            transactionsFilePath = req.file.path;
            console.log(transactionsFilePath);
        }
        else {
            logger.error(`${loggerPrefix} - No file uploaded`);
            return response({
                req,
                res,
                code: 400,
                message: "No file uploaded",
                data: {}
            })
        }

        const acount = AddAcountSequelizer({
            account_number,
            user_id,
            ifsc_code,
            loans,
            lastThrityDayTransactions: transactionsFilePath,
            loggerPrefix
        })

        return response({
            req,
            res,
            code: acount.code,
            message: acount.message,
            data: acount.data
        })
    } catch (error) {
        logger.error(`${loggerPrefix} - Error in Account Creation: ${error.message}`);
        return response({
            req,
            res,
            code: 500,
            message: "Internal server error",
            data: {}
        })
    }

};

module.exports = AddAccountController;