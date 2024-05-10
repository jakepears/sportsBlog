const router = require('express').Router();

// Import individual route files
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute');
const apiRoutes = require('./api/index');

// Home routes
router.use('/', homeRoutes);

// Dashboard routes
router.use('/dashboard', dashboardRoutes);

// API routes
router.use('/api', apiRoutes);

module.exports = router;