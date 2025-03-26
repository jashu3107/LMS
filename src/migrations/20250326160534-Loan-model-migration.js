'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('Loan', {
      loan_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: "Users",
            key: "user_id"
        }
    },
    account_number:{
        type: Sequelize.STRING(20),
        allowNull: false,
        references:{
            model: "Account",
            key: "account_number"
        }
    },
    vendor_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
            model: "Vendor",
            key: "vendor_id"
        }
    },
    loan_amount:{
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
    },
    loan_status:{
        type: Sequelize.STRING(50),
        allowNull: false
    }
    },{timestamps: false});
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.dropTable('Loan');
  }
};
