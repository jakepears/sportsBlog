const router = require('express').Router();
const upload = require('../config/multerConfig');

// Import individual route files
const uploadController = require('./uploadController');
const profileController = require('./profileController');
const homeRoutes = require('./homeRoute');
const articleRoutes = require('./articleRoute');
const apiRoutes = require('./api/');

// Home routes
router.use('/', homeRoutes);

// Dashboard routes
router.use('/', articleRoutes);

// API routes
router.use('/', apiRoutes);

// Upload route
router.post('/upload', upload.single('profilePic'), uploadController.uploadProfilePicture);

// Profile route
router.get('/profile', profileController.getProfile); 

module.exports = router;