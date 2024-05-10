const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Users = require('./Users'); 
const Posts = require('./Posts');

class Comments extends Model {}

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

//association with the Users model
Comments.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'user',
});

//association with the Posts model
Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: 'post',
});

module.exports = Comments;