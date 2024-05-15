const sequelize = require('../config/config');
const { Users, Posts, Comments } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Promise.all(
    postData.map(async (post) => {
      const user = users.find((user) => user.id === post.userId);
      if (user) {
        const newPost = await Posts.create({
          ...post,
          userId: user.id,
        });
        return newPost;
      }
    })
  );

  const comments = await Promise.all(
    commentData.map(async (comment) => {
      const user = users.find((user) => user.id === comment.userId);
      const post = posts.find((post) => post.id === comment.postId);
      if (user && post) {
        const newComment = await Comments.create({
          ...comment,
          userId: user.id,
          postId: post.id,
        });
        return newComment;
      }
    })
  );

  process.exit(0);
};

seedDatabase();