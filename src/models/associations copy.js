const {Users} = require("./Users.js");
const {Account} = require("./Account.js");
const {Loan} = require("./Loan.js");
const {Vendor} = require("./Vendor.js");

// User - Account (One-to-One)
Users.hasOne(Account, {
    foreignKey: 'user_id'
});
Account.belongsTo(Users, {
    foreignKey: 'user_id'
});

// Account - Loan (One-to-Many)
Account.hasMany(Loan, {
    foreignKey: 'account_number'
});
Loan.belongsTo(Account, {
    foreignKey: 'account_number'
});

// User - Loan (One-to-Many)
Users.hasMany(Loan, {
    foreignKey: 'user_id'
});
Loan.belongsTo(Users, {
    foreignKey: 'user_id'
});

// Vendor - Loan (One-to-Many)
Vendor.hasMany(Loan, {
    foreignKey: 'vendor_id'
});
Loan.belongsTo(Vendor, {
    foreignKey: 'vendor_id'
});

module.exports = {
    Users,
    Account,
    Loan,
    Vendor
};
