const { query, validationResult } = require("express-validator");
const logger = require("../../helpers/logger.js");

const getLoansValidation = [
    query("vendor_id")
        .notEmpty()
        .withMessage("Vendor ID is required")
        .isInt()
        .withMessage("Vendor ID must be an integer")
        .custom((value) => {
            if (value <= 0) {
                throw new Error("Vendor ID must be a positive integer");
            }
            return true;
        }),

    async (req, res, next) => {
        const loggerPrefixName = "getLoansValidation";
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.error(`${loggerPrefixName} Validation failed: ${JSON.stringify(errors.array())}`);
                return res.status(400).json({
                    message: "Validation failed",
                    code: 400,
                    data: errors.array()
                });
            }
            logger.info(`${loggerPrefixName} Validation successful`);
            next();
        } catch (error) {
            logger.error(`${loggerPrefixName} Error in validation: ${error.message}`);
            return res.status(500).json({
                message: "Internal server error during validation",
                code: 500,
                data: null
            });
        }
    }
];

module.exports = { getLoansValidation };