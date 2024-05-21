const router = require('express').Router();
const { Posts, Comments, Users } = require('../models/');
const { withGuard, withoutGuard } = require('../utils/authGuard');

// Route for the home page
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

    console.log('postData:', postData); 

    const posts = postData.map((post) => {
      console.log('Mapping post:', post);
      return post.get({ plain: true });
    });

    res.render('home', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.error('Home Route Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});
// Route for a specific post
router.get('/post/:id', async (req, res) => {
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
      // Render the post template with the fetched post and login status
      res.render('partials/posts', {
        post,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.error('Post Route Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// Route for the login page
router.get('/login', withoutGuard, (req, res) => {
  try {
    // Render the login template
    res.render('auth/login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for the signup page
router.get('/signup', withoutGuard, (req, res) => {
  try {
    // Render the signup template
    res.render('auth/signup');
  } catch (err) {
    console.error('Signup Route Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

module.exports = router;