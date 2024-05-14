// Import the required models
const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

// Define the associations between the models

// A user can have multiple posts (One-to-Many)
Users.hasMany(Posts, {
  foreignKey: 'user_id',    // The foreign key in the Posts model that references the Users model
  onDelete: 'CASCADE',      // Delete all associated posts when a user is deleted
});

// A post belongs to a single user (One-to-One)
Posts.belongsTo(Users, {
  foreignKey: 'user_id',   
});

// A user can have multiple comments (One-to-Many)
Users.hasMany(Comments, {
  foreignKey: 'user_id',    // The foreign key in the Comments model that references the Users model
  onDelete: 'CASCADE',
});

// A comment belongs to a single user (One-to-One)
Comments.belongsTo(Users, {
  foreignKey: 'user_id',    
});

// A post can have multiple comments (One-to-Many)
Posts.hasMany(Comments, {
  foreignKey: 'post_id',    // The foreign key in the Comments model that references the Posts model
  onDelete: 'CASCADE',      
});

// A comment belongs to a single post (One-to-One)
Comments.belongsTo(Posts, {
  foreignKey: 'post_id',    
});

// Export the models
module.exports = {
  Users,
  Posts,
  Comments,
};