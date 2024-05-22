const router = require('express').Router();
const { Users } = require('../../models');
const { Op } = require('sequelize');
const upload = require('../../config/multerConfig');

// Create a new user
router.post('/signup', upload.single('profilePicture'), async (req, res) => {
  try {
    const { email, username, password } = req.body;
    
    // Check if all required fields are present
    if (!email || !username || !password) {
      res.status(400).json({ message: 'Email, username, and password are required' });
      return;
    }
    
    // Check if the email or username already exists
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
    
    if (existingUser) {
      res.status(400).json({ message: 'Email or username already exists' });
      return;
    }
    
    const profilePicture = req.file ? req.file.path : null;
    
    const usersData = await Users.create({
      email,
      username,
      password,
      profilePicture,
    });
    
    req.session.save(() => {
      req.session.user_id = usersData.id;
      req.session.username = usersData.username;
      req.session.logged_in = true;
      res.status(200).json(usersData);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the user by username or email
      const usersData = await Users.findOne({
        where: {
          [Op.or]: [
            { email: email }
          ]
        }
      });
      if (!usersData) {
        res.status(400).json({ message: 'No User Data' });
        return;
      }
      console.log(usersData.password);
      const validPassword = await usersData.checkPassword(password);
      console.log(validPassword,"---------");

      if (!validPassword) {
       res.status(400).json({ message: 'Incorrect username/email or password, please try again' });
        return;
      }
  
      req.session.save(function(err){
        req.session.user_id = usersData.id;
        req.session.username = usersData.username;
        req.session.logged_in = true;
        if(err) console.log(err);
        res.render('home',{ usersData, message: 'You are now logged in!' });
        //res.status(200).json({ usersData, message: 'You are now logged in!' });
      });
      console.log("session.saved");
      console.log(req.session);
      console.log("session.saved");
    } catch (err) {
      res.status(400).json(err);
    }
  });

// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
