const express = require("express");
const {Users,Account,Vendor,Loan} = require("../models/associations.js");
const router = express.Router();
const {applyLoanforUserController} = require("../controllers/applyLoanforUserController.js");
const {isTheUserEligibleForLoanValidation} = require("../validation/isTheUserEligibleForLoanValidation.js");

//  router.use('/',userValidation,userController) ;


router.post("/applyLoan",isTheUserEligibleForLoanValidation,applyLoanforUserController)


module.exports = router;