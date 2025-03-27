const express = require("express");
const {Users} = require("../models/associations.js");
const { updateLoanController } = require("../controllers/updateLoanController.js");
const router = express.Router();
const updateLoanValidations = require("../validation/updateLoanValidation.js");


router.put("/updateLoan",updateLoanValidations,updateLoanController);

module.exports = router;