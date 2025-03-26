const { Sequelize} = require("sequelize");
const config = require("./index.js");

console.log(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, config.DB_HOST, config.DB_DIALECT, config.DB_PORT);
const sequelizer = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    port: config.DB_PORT,
    logging: false
});

try{
    sequelizer.authenticate();
    console.log('Connection has been established successfully.');
}catch(error){
    console.error('Unable to connect to the database:', error);
}

module.exports = {sequelizer};