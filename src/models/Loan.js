const {sequelizer} = require("../config/db.js");
const {DataTypes} = require("sequelize")
const {Users} = require("./Users.js");
const {Account} = require("./Account.js");
const {Vendor} = require("./Vendor.js")

const Loan = sequelizer.define("Loan",{
    loan_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Users,
            key: "user_id"
        }
    },
    account_number:{
        type: DataTypes.STRING(20),
        allowNull: false,
        references:{
            model: Account,
            key: "account_number"
        }
    },
    vendor_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Vendor,
            key: "vendor_id"
        }
    },
    loan_amount:{
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false
    },
    loan_status:{
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{timestamps: false});

module.exports = {Loan}