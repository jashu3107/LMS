'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('vendors', {
      vendor_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    vendor_mail:{
        type: Sequelize.STRING,
        allowNull: false
    },
    vendor_password:{
        type: Sequelize.STRING,
        allowNull: false
    }
    },{timestamps:false})
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('vendors');
  }
};
