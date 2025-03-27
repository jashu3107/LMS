const express = require("express");
const {Users} = require("../models/associations.js");
const router = express.Router();
const {getLoansController} = require("../controllers/vendorControllers/getLoansControllers.js");
const { getLoansValidation } = require("../validation/vendorValidation/getLoansValidation.js");

//  router.use('/',userValidation,userController) ;
//router.get('/fetchLoan',getLoansController);

router.get("/getLoans",getLoansValidation,getLoansController);

module.exports = router;