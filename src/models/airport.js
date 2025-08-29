'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Airport.init({
    names:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },
    code: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true

    },
    Address: {
      type: DataTypes.STRING,
      unique: true
    },
    cityID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      type: 'foreign key',
      references: {
        model: 'Cities',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};