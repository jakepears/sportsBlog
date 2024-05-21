// profileController.js
const { Users } = require('../models');

const getProfile = async (req, res) => {
  try {
    // Fetch the user's profile data from the database based on the logged-in user's ID
    const user = await Users.findByPk(req.session.user_id);
    if (!user) {
      return res.status(404).render('error', { message: 'User not found' });
    }
    // Render the profile view with the user's data
    res.render('partials/profile', { user });
  } catch (err) {
    console.error('Failed to fetch user profile:', err);
    res.status(500).render('error', { message: 'Failed to fetch user profile' });
  }
};

module.exports = { getProfile };