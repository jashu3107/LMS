const {body, query, validationResult} = require('express-validator');
const {Loan} = require('../models/Loan.js');
const {Users} = require('../models/Users.js');

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
        })
        .custom(async (user_id) => {
            const user = await Users.findOne({ where: { user_id } });
            if (!user) {
                throw {
                    code: 404,
                    message: 'Invalid user ID',
                    data: {}
                };
            }
            return true;
        })
        .custom(async (user_id, {req}) => {
            const loan = await Loan.findOne({ where: { loan_id: req.query.loan_id } });
            if (!loan) {
                throw {
                    code: 404,
                    message: 'Loan not found',
                    data: {}
                };
            }
            if (loan.user_id !== parseInt(user_id)) {
                throw {
                    code: 403,
                    message: 'User is not authorized to update this loan',
                    data: {}
                };
            }
            return true;
        }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = errors.array()[0];
            return res.status(error.msg.code).json(error.msg);
        }
        next();
    }
];

module.exports = updateLoanValidations;


