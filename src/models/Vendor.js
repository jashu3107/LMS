const {sequelizer} = require("../config/db.js")
const {DataTypes} = require("sequelize")

const Vendor = sequelize.define("Vendor",{
    vendor_id:{
        type: DataTypes.Integer,
        primaryKey: true,
        allowNull: false
    },
    vendor_mail:{
        type: DataTypes.STRING,
        allowNull: false
    },
    vendor_password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{timestamps:true})

module.exports = {Vendor}