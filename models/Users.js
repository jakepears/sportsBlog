const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Users', 
    tableName: 'users', 
    timestamps: false,
    underscored: true,
  }
);

module.exports = Users;