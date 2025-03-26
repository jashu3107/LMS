const logger = require("../../config/logger");

const getLoans = async (req, res) => {
    const loggerPrefixName = "getLoans";
    try{
        const userData = await getLoansSequelizeController(req.body.vendor_id);
        if(!userData){
            return response({
                req,
                res,
                message: userData?.message,
                code: userData?.code,
                data: userData?.data
            })
        }
        logger.info('${loggerPrefixName} Loans fetched successfully');
        return response({
            req,
            res,
            message: userData?.message,
            code: userData?.code,
            data: userData?.data
        })
    }catch(error){
        logger.error('${loggerPrefixName} Error in fetching loans');
        return response({   
            req,
            res,
            message: error?.message,
            code: error?.code,
            data: error?.data
        })
    }
}

module.exports = {getLoans};
