const router = require('express').Router();
const { Comments, Users, Posts } = require('../../models');
const { withGuard } = require('../../utils/authGuard');

// Create a new comment
router.post('/', withGuard, async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Check if all required fields are present
    if (!content || !postId) {
      res.status(400).json({ message: 'Content and postId are required' });
      return;
    }

    const commentsData = await Comments.create({
      content,
      user_id: req.session.user_id,
      post_id: postId,
    });

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all comments for a specific post
router.get('/:postId', async (req, res) => {
    try {
      const commentsData = await Comments.findAll({
        where: {
          post_id: req.params.postId,
        },
        include: [
          {
            model: Users,
            as: 'user',
            attributes: ['name', 'profilePicture'],
          },
        ],
      });
  
      res.status(200).json(commentsData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Update a comment
router.put('/:id', withGuard, async (req, res) => {
  try {
    const { content } = req.body;

    const commentsData = await Comments.findByPk(req.params.id);

    if (!commentsData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    if (commentsData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to update this comment' });
      return;
    }

    await commentsData.update({ content });

    res.status(200).json(commentsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete('/:id', withGuard, async (req, res) => {
  try {
    const commentsData = await Comments.findByPk(req.params.id);

    if (!commentsData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    if (commentsData.user_id !== req.session.user_id) {
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }

    await commentsData.destroy();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;