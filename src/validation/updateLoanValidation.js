const {body, query, validationResult} = require('express-validator');
const {Loan} = require('../models/Loan.js');
const {Users} = require('../models/Users.js');
const logger = require('../helpers/logger.js');

const updateLoanValidations = [
    query('loan_id')
        .notEmpty().withMessage({
            code: 400,
            message: 'Loan ID is required',
            data: {}
        })
        .isInt().withMessage({
            code: 400,
            message: 'Loan ID must be an integer',
            data: {}
        }),
    
    body('user_id')
        .notEmpty().withMessage({
            code: 400,
            message: 'User ID is required',
            data: {}
        })
        .isInt().withMessage({
            code: 400,
            message: 'User ID must be an integer',
            data: {}
        }),
        
        async (req, res, next) => {
            logger.info("Validation started");
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                logger.info("Validation failed");
                return res.status(400).json({ errors: errors.array() });
            }
            logger.info("Validation completed");
            next();
        },

];

module.exports = updateLoanValidations;


