const router = require('express').Router();
const { Posts, Comments, Users } = require('../models');
const { withGuard } = require('../utils/authGuard');

// Route for the posts page
router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        { model: Users, as: 'user' },
        {
          model: Comments,
          as: 'comments',
          include: [{ model: Users, as: 'user' }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for the article page
router.get('/article/:id', async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        { model: Users, as: 'user' },
        {
          model: Comments,
          as: 'comments',
          include: [{ model: Users, as: 'user' }],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('article', {
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

// Route for creating a new post (accessible only to logged-in users)
router.get('/new', withGuard, (req, res) => {
  // Render the newPost template with the login status
  res.render('newPost', {
    loggedIn: req.session.logged_in,
  });
});

// Route for editing a specific post (accessible only to logged-in users)
router.get('/edit/:id', withGuard, async (req, res) => {
  try {
    // Fetch a specific post by its ID with associated User and Comment data
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        { model: Users, as: 'user' },
        {
          model: Comments,
          as: 'comments',
          include: [{ model: Users, as: 'user' }],
        },
      ],
    });

    if (postData) {
      // If the post exists, convert it to a plain JavaScript object
      const post = postData.get({ plain: true });

      // Render the editPost template with the fetched post and login status
      res.render('editPost', {
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
