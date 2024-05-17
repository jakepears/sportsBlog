const express = require('express');
const sequelize = require('./config/config');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const User = require('./models/Users');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const upload = require('./config/multerConfig');
const { Comments, Posts } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

const exphbs = hbs.create({
  helpers,
  partialsDir: [
    path.join(__dirname, 'views/partials'),
    path.join(__dirname, 'views/auth'),
  ],
});

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Register Handlebars engine
app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('profilePic'), async (req, res) => {
  if (!req.file) {
    return res.status(400).render('error', { message: 'No file uploaded' });
  }

  // Access uploaded file info
  const filePath = req.file.path;

  // Create new user instance with required fields
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    profilePicture: filePath,
  });

  try {
    // Save user to database
    await newUser.save();
    res.redirect('/profile'); // Redirect to profile page or any other appropriate page
  } catch (err) {
    console.error('Failed to save user:', err);
    res.status(500).render('error', { message: 'Failed to save user' });
  }
});

// Start server
sequelize
  .sync({ force: false })
  .then(() => {
    return User.sync();
  })
  .then(() => {
    return Posts.sync();
  })
  .then(() => {
    return Comments.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing models:', err);
  });