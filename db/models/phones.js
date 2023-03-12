'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phones extends Model {

    static associate(models) {

    }
  }
  Phones.init({
    id: DataTypes.STRING,
    category: DataTypes.STRING,
    phoneId: DataTypes.STRING,
    itemId: DataTypes.STRING,
    name: DataTypes.STRING,
    fullPrice: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    screen: DataTypes.STRING,
    capacity: DataTypes.STRING,
    color: DataTypes.STRING,
    ram: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Phones',
  });
  return Phones;
};
