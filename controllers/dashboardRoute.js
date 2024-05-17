const router = require('express').Router();
const { Posts, Comments, Users } = require('../models');
const { withGuard } = require('../utils/authGuard');

// Route for the dashboard page
router.get('/', withGuard, async (req, res) => {
  try {
    // Fetch all posts for the logged-in user with associated User and Comment data
    const postData = await Posts.findAll({
      where: { userId: req.session.user_id },
      include: [
        { model: Users, as: 'user' },
        { model: Comments, as: 'comments', include: [{ model: Users, as: 'user' }] },
      ],
      order: [['createdAt', 'DESC']], // Order posts by creation date in descending order
    });

    // Convert the fetched posts to plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the fetched posts, dashboard flag, and login status
    res.render('dashboard', {
      dashboard: true,
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating a new post
router.get('/new', withGuard, (req, res) => {
  // Render the newPost template with the dashboard flag and login status
  res.render('newPost', {
    dashboard: true,
    loggedIn: req.session.logged_in,
  });
});

// Route for editing a specific post
router.get('/edit/:id', withGuard, async (req, res) => {
  try {
    // Fetch a specific post by its ID with associated User and Comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: Users, as: 'user' },
        { model: Comments, as: 'comments', include: [{ model: Users, as: 'user' }] },
      ],
    });

    if (postData) {
      // If the post exists, convert it to a plain JavaScript object
      const post = postData.get({ plain: true });

      // Render the editPost template with the fetched post, dashboard flag, and login status
      res.render('editPost', {
        dashboard: true,
        post,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;