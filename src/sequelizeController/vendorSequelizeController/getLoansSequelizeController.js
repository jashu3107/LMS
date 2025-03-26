const {Loan} = require("../../models");
const {response} = require("../../utils/responseHandler");
const logger = require("../../config/logger");

const getLoansSequelizeController = async (vendor_id) => {
    const loggerPrefixName = "getLoansSequelizeController";
    try{
        logger.info('${loggerPrefixName} Fetching loans for vendor started');
        const loans = await Loan.findAll({
            where: {
                vendor_id: vendor_id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_id', 'first_name', 'last_name', 'phone_number', 'email', 'loan_flag']
                },
                {
                    model: Vendor,
                    as: 'vendor',
                    attributes: ['vendor_id'] 
                }
            ],
            attributes: ['loan_id', 'loan_amount', 'loan_status', 'account_number', 'vendor_id']
        });
        if(!loans){
            logger.error('${loggerPrefixName} No loans found for vendor');
            return response({
                req,
                res,
                message: loans?.message,    
                code: loans?.code,
                data: loans?.data
            })
        }
        logger.info('${loggerPrefixName} Loans fetched successfully');
        return response({
            req,
            res,
            message: loans?.message,
            code: loans?.code,
            data: loans?.data       
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

module.exports = {getLoansSequelizeController};
