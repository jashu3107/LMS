'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('accounts', {
      account_number:{
          type: Sequelize.STRING(20),
          primaryKey: true,
          allowNull: false
      },
      user_id:{
          unique: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
              model: 'users',
              key: "user_id"
          }
      },
      ifsc_code:{
          type: Sequelize.STRING,
          allowNull: false
      },
      loans:{
          type: Sequelize.ARRAY(Sequelize.STRING)
      },
      lastThrityDayTransactions:{
          type: Sequelize.STRING
      }
  },{timestamps:false});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('accounts');
  }
};
