const express = require("express");
const { getLoansController } = require("../controllers/vendorControllers/getLoansControllers.js");
const { getLoansValidation } = require("../validation/vendorValidation/getLoansValidation.js");
const router = express.Router();

router.get("/getLoans",getLoansValidation,getLoansController);

module.exports = router;