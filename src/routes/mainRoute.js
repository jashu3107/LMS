const express = require("express");
const { Users } = require("../models/associations.js");
const AddAccountValidations = require("../validation/AccountValidations/AddAccountValidations.js");
const AddAccountFileUpload = require("../helpers/AccountUploadMiddleWare/AccountFileUpload.js");
const AddAccountController = require("../controllers/AccountsController/AddAccountController.js");
const router = express.Router();

// router.post("/addaccount",(req, res))

router.post("/addaccount", AddAccountFileUpload, AddAccountController);
module.exports = router;