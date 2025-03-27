const logger = require("../../helpers/logger");
const { getLoansSequelizeController } = require("../../sequelizeController/vendorSequelizeController/getLoansSequelizeController");
const { response } = require("../../helpers/response.js");
const getLoansController = async (req, res) => {
    const loggerPrefixName = "getLoansController";
    try{
        logger.info(`${loggerPrefixName} Fetching loans for vendor started`);
        const userData = await getLoansSequelizeController(req.query.vendor_id);
        if(!userData){
            return response({
                req,
                res,
                message: userData?.message,
                code: userData?.code,
                data: userData?.data
            })
        }
        logger.info(`${loggerPrefixName} Loans fetched successfully`);
        return response({
            req,
            res,
            message: userData?.message,
            code: userData?.code,
            data: userData?.data
        })
    }catch(error){
        logger.error(`${loggerPrefixName} Error in fetching loans`);
        return response({   
            req,
            res,
            message: error?.message,
            code: error?.code,
            data: error?.data
        })
    }
}

module.exports = {getLoansController};
