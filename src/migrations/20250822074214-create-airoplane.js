'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airoplane', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER   // ✅ use Sequelize.DataTypes
      },
      modelNumber: {
        type: Sequelize.DataTypes.STRING,   // ✅ fixed
        allowNull: false
      },
      capacity: {
        type: Sequelize.DataTypes.INTEGER,  
        defaultValue:0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE      // ✅ fixed
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE      // ✅ fixed
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Airoplanes');
  }
};
