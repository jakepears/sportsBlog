// uploadController.js
const { Users } = require('../models');
const path = require('path');

const uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).render('error', { message: 'No file uploaded' });
  }

  // Access uploaded file info
  const filePath = path.join('uploads', req.file.filename);

  // Create new user instance with required fields
  const newUser = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilePicture: filePath,
  });

  try {
    // Save user to database
    await newUser.save();

    // Set user's session data
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    res.redirect('/profile');
  } catch (err) {
    // ... (error handling code remains the same)
  }
};

module.exports = { uploadProfilePicture };