const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Users = require('./Users');
const Comments = require('./Comments');

class Posts extends Model {}

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

// association with the Users model
Posts.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'user',
});

// association with the Comments model
Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  as: 'comments',
});

module.exports = Posts;
