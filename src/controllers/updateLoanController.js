const { response } = require("../helpers/response.js");
const { updateLoanSequelizeController } = require("../sequelizeController/updateLoanSequelizeController.js");
const logger = require("../helpers/logger.js");

const updateLoanController = async (req, res) => {
    const loggerprefix = "updateLoanControllers";
    logger.info(`${loggerprefix}-updateLoanController`);
    logger.info("updateLoanController");
    try {
        const result = await updateLoanSequelizeController({
            user_id: req.body.user_id,
            loan_id: req.query.loan_id
        });

        if (!result) {
            logger.error("Failed to process the request");
            return response({
                req,
                res,
                code: 500,
                message: "Failed to process the request",
                data: {}
            });
        }
        
        logger.info("Successfully processed the request");
        return response({
            req,
            res,
            code: result.code,
            message: result.message,
            data: result.data
        });

    } catch(err) {
        logger.error(err?.message || "Internal Server Error");
        return response({
            req,
            res,
            code: 500,
            message: err?.message || "Internal Server Error",
            data: {}
        });
    }
};

module.exports = { updateLoanController };