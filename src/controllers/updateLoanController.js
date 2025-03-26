const {updateLoanSequelizeController} = require("../sequelizeController/updateLoanSequelizeController.js");

const updateLoanController = async (req, res) => {
    try {
        const result = await updateLoanSequelizeController(
            {user_id: req.body.user_id},
            req.query.loan_id
        );

        if(!result) {
            return res.status(500).json({
                code: 500,
                message: "Failed to process the request",
                data: {}
            });
        }

        if(req.body.user_id == 1) {
            return res.status(201).json({
                code: 201,
                message: "Loan got Initiated",
                data: {}
            });
        }

        if(req.body.user_id == 2) {
            return res.status(200).json({
                code: 200,
                message: "Loan got Approved",
                data: {}
            });
        }

        if(req.body.user_id == 3) {
            return res.status(403).json({
                code: 403,
                message: "Loan got Rejected",
                data: {}
            });
        }

        return res.status(404).json({
            code: 404,
            message: "Give the correct user_id to update the loan",
            data: {}
        });

    } catch(err) {
        return res.status(500).json({
            code: 500,
            message: err?.message || "Internal Server Error",
            data: {}
        });
    }
};

module.exports = {updateLoanController};