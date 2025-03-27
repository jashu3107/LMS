const { findAccountByPkSequelize } = require("./loanSequelizeController/findAccountByPkSequelize");
const { findLoanByIdSequelize } = require("./loanSequelizeController/findLoanByIdSequelize");
const { findUserByPkSequelize } = require("./loanSequelizeController/findUserByPkSequelize");


module.exports = {findUserByPkSequelize, findAccountByPkSequelize, findLoanByIdSequelize};


