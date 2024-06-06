const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const { withGuard } = require('../../utils/authGuard');

// Create a new post
router.post('/', withGuard, async (req, res) => {
  try {
    const { title, content } = req.body;
    // Check if all required fields are present
    if (!title || !content) {
      res.status(400).json({ message: 'Title and content are required' });
      return;
    }
    const postsData = await Posts.create({
      title,
      content,
      user_id: req.session.user_id,
    });
    res.redirect('/newPost'); 
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [
        { model: Users, as: 'user', attributes: ['name', 'profilePicture'] },
        {
          model: Comments,
          as: 'comments',
          include: [{ model: Users, as: 'user', attributes: ['name', 'profilePicture'] }],
        },
      ],
    });
    res.render('partials/posts', { posts: postsData });
  } catch (err) {
    console.error('Get All Posts Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        { model: Users, as: 'user', attributes: ['name', 'profilePicture'] },
        {
          model: Comments,
          as: 'comments',
          include: [{ model: Users, as: 'user', attributes: ['name', 'profilePicture'] }],
        },
      ],
    });
    if (!postsData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.render('partials/posts', { posts: [postsData] }); 
  } catch (err) {
    console.error('Get Single Post Error:', err);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

// Update a post
router.put('/:id', withGuard, async (req, res) => {
  try {
    const { title, content } = req.body;
    const postsData = await Posts.findByPk(req.params.id);
    if (!postsData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    if (postsData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this post' });
      return;
    }
    await postsData.update({ title, content });
    res.redirect('/posts'); 
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', withGuard, async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id);
    if (!postsData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    if (postsData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this post' });
      return;
    }
    await postsData.destroy();
    res.redirect('/posts'); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;