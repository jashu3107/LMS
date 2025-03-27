const {Loan, Users, Vendor} = require("../../models/associations.js");
const logger = require("../../helpers/logger.js");

const getLoansSequelizeController = async (vendor_id) => {
    const loggerPrefixName = "getLoansSequelizeController";
    try{
        logger.info(`${loggerPrefixName} Fetching loans started`);
        const loans = await Loan.findAll({
            where: {
                vendor_id: vendor_id
            },
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['user_id', 'first_name', 'last_name', 'phone_number', 'email', 'loan_flag']
                },
                {
                    model: Vendor,
                    as: 'vendor',
                    attributes: ['vendor_id', 'vendor_mail'] 
                }
            ],
            attributes: ['loan_id', 'loan_amount', 'loan_status', 'account_number', 'vendor_id']
        });

        if(!loans || loans.length === 0){
            logger.error(`${loggerPrefixName} No loans found for vendor`);
            return {
                message: "No loans found for vendor",
                code: 404,
                data: null
            };
        }
        logger.info(`${loggerPrefixName} Loans fetched successfully`);
        return {
            message: "Loans fetched successfully",
            code: 200,
            data: loans
        };
    }catch(error){
        logger.error(`${loggerPrefixName} Error in fetching loans: ${error.message}`);
        return {
            message: error.message,
            code: 500,
            data: null
        };
    }
}

module.exports = {getLoansSequelizeController};