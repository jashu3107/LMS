const express = require("express");
const router = express.Router();

const AddAccountFileUpload = require("../helpers/AccountUploadMiddleWare/AccountFileUpload.js");
const AddAccountController = require("../controllers/AccountsController/AddAccountController.js");

const {
  signupController,
} = require("../controllers/userController/signupController.js");
const {
  signinController,
} = require("../controllers/userController/signinController.js");
const {
  validationSignup,
} = require("../validation/userValidation/validationSignup.js");
const { protect } = require("../authentication/protect.js");
const {
  validationSignin,
} = require("../validation/userValidation/validationSignin.js");
const {
  adminSigninController,
} = require("../controllers/adminController/adminSigninController.js");

const adminSignUp = require("../controllers/adminController/adminSignup.js");

router.post("/signup", validationSignup, signupController); //DONE
router.post("/signin", validationSignin, signinController); //DONE

router.post("/adminsignin", validationSignin, adminSigninController);//DONE

router.post(
  "/addaccount",
  protect,
  AddAccountFileUpload,
  AddAccountController
);

router.post("/adminsignup",adminSignUp);


module.exports = router;
