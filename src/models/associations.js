const {Users} = require("./Users.js");
const {Account} = require("./Account.js");
const {Loan} = require("./Loan.js");
const {Vendor} = require("./Vendor.js");

// user - acc one to one
Users.hasOne(Account, {
    foreignKey: 'user_id',
    as: 'account'
});
Account.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'user'
});

//account - loan one to many
Account.hasMany(Loan, {
    foreignKey: 'account_number',
    as: 'accountLoans'
});
Loan.belongsTo(Account, {
    foreignKey: 'account_number',
    as: 'account'
});

//user - loan one to many
Users.hasMany(Loan, {
    foreignKey: 'user_id',
    as: 'userLoans'
});
Loan.belongsTo(Users, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = {
    Users, Account, Loan, Vendor
};
 