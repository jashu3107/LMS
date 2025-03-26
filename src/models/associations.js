const {Users} = require("./Users.js");
const {Account} = require("./Account.js");
const {Loan} = require("./Loan.js");
const {Vendor} = require("./Vendor.js")

// user - acc one to one
Users.hasOne(Account,{
    foreignKey: 'user_id'
});
Account.belongsTo(Users,{
    foreignKey: 'user_id'
});

//accountt - loan one to many
Account.hasMany(Loan,{
    foreignKey: 'account_number'
});
Loan.belongsTo(Account,{
    foreignKey: 'account_number'
})

//user -lone one to many
Users.hasMany(Loan,{
    foreignKey: 'user_id'
});
Loan.belongsTo(Users,{
    foreignKey: 'user_id'
});

module.exports = {
    Users, Account, Loan
};


