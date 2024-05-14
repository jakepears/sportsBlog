// Import the required modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance from the connection configuration
const sequelize = require('../config/connection');

// Import the Users and Posts models
const Users = require('./Users');
const Posts = require('./Posts');

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

/* Define the association between the Comments model and the Users model
A comment belongs to a user, with the foreign key 'user_id'
The associated user data will be available as 'user' on the comment instance */
Comments.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'user',
});

/* Define the association between the Comments model and the Posts model
A comment belongs to a post, with the foreign key 'post_id'
The associated post data will be available as 'post' on the comment instance */
Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: 'post',
});

// Export the Comments model for use in other parts of the application
module.exports = Comments;