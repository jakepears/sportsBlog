// Import the required modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance from the connection configuration
const sequelize = require('../config/config');

// Define the Comments model class that extends the Sequelize Model class
class Comments extends Model {}

// Initialize the Comments model with its attributes and options
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comments',
  }
);

// Export the Comments model for use in other parts of the application
module.exports = Comments;