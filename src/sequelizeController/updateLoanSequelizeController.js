const {Loan} = require("../models/Loan.js");


const updateLoanSequelizeController = async(data, id)=>
{
    try{
        const result = await Loan.update(data, {where: {loan_id: id}});
        
        if(result[0] === 0) {
            return {
                code: 404,
                message: "Failed to update loan",
                data: {}
            };
        }

        return {
            code: 200,
            message: "Loan updated successfully",
            data: data
        };
    }
    catch(err) {
        console.log(err);
        return {
            code: err.code || 500,
            message: err?.message || "Internal server error",
            data: {}
        };
    }
};

module.exports = { updateLoanSequelizeController };