const {sequelizer} = require("../config/db.js")
const {DataTypes} = require("sequelize")

const Vendor = sequelizer.define("Vendor",{
    vendor_id:{
        type: DataTypes.INTEGER,
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
},{timestamps:false})

module.exports = {Vendor}