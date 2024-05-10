const express = require('express');
const router = express.Router();

// Imported route files
const userRoutes = require('./usersRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentsRoutes');

// Mounted the routes on specific paths
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;