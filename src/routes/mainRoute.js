const express = require("express");
const {Users} = require("../models/associations.js");
const { signupController } = require("../controllers/userController/signupController.js");
//const {Users} = require("../models/Users.js");
const { signinController } = require("../controllers/userController/signinController.js");
const router = express.Router();
const {validationSignup} = require("../validation/userValidation/validationSignup.js");
const {protect} = require("../authentication/protect.js");
const {validationSignin} = require("../validation/userValidation/validationSignin.js");
//  router.use('/',userValidation,userController) ;

router.post('/signup',(req, res, next)=>{
console.log("-----------------------------");
next();
},validationSignup,signupController);
router.post('/signin',validationSignin, signinController);

module.exports = router;