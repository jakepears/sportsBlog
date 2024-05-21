const router = require('express').Router();
const upload = require('../config/multerConfig');

// Import individual route files
const uploadController = require('./uploadController');
const profileController = require('./profileController');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute');
const apiRoutes = require('./api/index');

// Home routes
router.use('/', homeRoutes);

// Dashboard routes
router.use('/dashboard', dashboardRoutes);

// API routes
router.use('/api', apiRoutes);

// Upload route
router.post('/upload', upload.single('profilePic'), uploadController.uploadProfilePicture);

// Profile route
router.get('/profile', profileController.getProfile); 

module.exports = router;