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

       if(result.code == 404){
        return res.status(404).json({
            code: 404,
            message: "Give the correct user_id to update the loan",
            data: {}
        });
    }

    } catch(err) {
        return res.status(500).json({
            code: 500,
            message: err?.message || "Internal Server Error",
            data: {}
        });
    }
};

module.exports = {updateLoanController};