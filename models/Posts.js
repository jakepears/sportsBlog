// Import the required modules from Sequelize
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance from the connection configuration
const sequelize = require('../config/connection');

// Import the Users and Comments models
const Users = require('./Users');
const Comments = require('./Comments');

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
  }
);

/* Define the association between the Posts model and the Users model
A post belongs to a user, with the foreign key 'user_id'
The associated user data will be available as 'user' on the post instance */
Posts.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'user',
});

/* Define the association between the Posts model and the Comments model
A post has many comments, with the foreign key 'post_id'
The associated comments data will be available as 'comments' on the post instance */
Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  as: 'comments',
});

// Export the Posts model for use in other parts of the application
module.exports = Posts;