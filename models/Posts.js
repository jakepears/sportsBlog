// Import the required modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance from the connection configuration
const sequelize = require('../config/config');

// Define the Posts model class that extends the Sequelize Model class
class Posts extends Model {}

// Initialize the Posts model with its attributes and options
Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
    tableName: 'posts',
  }
);

// Export the Posts model for use in other parts of the application
module.exports = Posts;
