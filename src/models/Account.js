const {sequelizer} = require("../config/db.js")
const {DataTypes} = require("sequelize")
const {Users} = require("./Users.js");

const Account = sequelizer.define("Account",{
    account_number:{
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    user_id:{
        unique: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Users,
            key: "user_id"
        }
    },
    ifsc_code:{
        type: DataTypes.STRING,
        allowNull: false
    },
    loans:{
        type: DataTypes.Array(DataTypes.STRING)
    },
    lastThrityDayTransactions:{
        type: DataTypes.STRING
    }
}, {timestamps: true})

module.exports = {Account}