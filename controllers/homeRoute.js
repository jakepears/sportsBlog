const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

// Route for the home page
router.get('/', async (req, res) => {
  try {
    // Fetch all posts with associated User and Comment data
    const postData = await Post.findAll({
      include: [
        User,
        { model: Comment, include: [User] },
      ],
      order: [['createdAt', 'DESC']], // Order posts by creation date in descending order
    });

    // Convert the fetched posts to plain JavaScript objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the home template with the fetched posts and login status
    res.render('home', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('Home Route Error');
  }
});

// Route for a specific post
router.get('/post/:id', async (req, res) => {
  try {
    // Fetch a specific post by its ID with associated User and Comment data
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        { model: Comment, include: [User] },
      ],
    });

    if (postData) {
      // If the post exists, convert it to a plain JavaScript object
      const post = postData.get({ plain: true });

      // Render the post template with the fetched post and login status
      res.render('post', {
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

// Route for the login page
router.get('/login', withoutGuard, (req, res) => {
  try {
    // Render the login template
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for the signup page
router.get('/signup', withoutGuard, (req, res) => {
  try {
    // Render the signup template
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;