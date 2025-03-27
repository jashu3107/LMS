const { getLoansSequelizeController } = require("./vendorSequelizeController/getLoansSequelizeController.js");
const { findAccountByPkSequelize } = require("./loanSequelizeController/findAccountByPkSequelize");
const { findLoanByIdSequelize } = require("./loanSequelizeController/findLoanByIdSequelize");
const { findUserByPkSequelize } = require("./loanSequelizeController/findUserByPkSequelize");
const { applyLoanSequelizeController } = require("./loanSequelizeController/applyLoanSequelizeController");
const { updateLoansInAccountsSequelizeController } = require("./loanSequelizeController/updateLoansInAccountsSequelizeController");
const { updateLoansInUsersSequelizeController } = require("./loanSequelizeController/updateLoansInUsersSequelizeController");

module.exports = {findUserByPkSequelize, findAccountByPkSequelize, findLoanByIdSequelize,getLoansSequelizeController,applyLoanSequelizeController,updateLoansInAccountsSequelizeController,updateLoansInUsersSequelizeController};

