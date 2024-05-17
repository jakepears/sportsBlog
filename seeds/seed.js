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
      const user = users.find((user) => user.id === post.user_id);
      if (user) {
        const newPost = await Posts.create({
          ...post,
          user_id: user.id,
        });
        return newPost;
      }
    })
  );

  const comments = await Promise.all(
    commentData.map(async (comment) => {
      const user = users.find((user) => user.id === comment.user_id);
      const post = posts.find((post) => post.id === comment.post_id);
      if (user && post) {
        const newComment = await Comments.create({
          ...comment,
          user_id: user.id,
          post_id: post.id,
        });
        return newComment;
      }
    })
  );

  process.exit(0);
};

seedDatabase();