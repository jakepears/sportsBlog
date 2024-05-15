const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

// Middleware for handling remember me cookie
router.use((req, res, next) => {
    const rememberMeToken = req.cookies.remember_me;
    // If remember me token exists, consider the user logged in
    if (rememberMeToken) {
        req.user = {};
    }
    next();
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('remember_me'); // Clear the remember me cookie on logout
    res.redirect('/');
});

// Login route
router.post('/login', (req, res) => {
    const rememberMe = req.body.remember_me;
    //if remember me checkbox is checked when logging in then activate the rememberMe cookie
    if (rememberMe) {
        res.cookie('remember_me', 'token', { maxAge: 7 * 24 * 60 * 60 * 1000 }); // Set the remember me cookie to last 7 days
    }
    res.redirect('/dashboard');
});

module.exports = router;