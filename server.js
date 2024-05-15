const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const bcrypt = require('bcrypt');
const User = require('./models/Users');
const app = express();

const port = process.env.PORT || 3000;

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home', {
    showFeed: true,
  });
});

app.get('/article', (req, res) => {
  res.render('article', {});
});

app.get('/login', (req, res) => {
  res.render('auth/login', {
    showLogin: true,
  });
});

app.get('/signup', (req, res) => {
  res.render('auth/signup', {});
});

app.get('/createPost', (req, res) => {
  res.render('auth/signup', {});
});

app.post('/upload', upload.single('profilePic'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Access uploaded file info
  const filePath = req.file.path;

  // Create new user instance with file path
  const newUser = new User({
    // Other user data fields
    profilePicture: filePath,
  });

  try {
    // Save user to database
    await newUser.save();
    res.json({ success: true, fileInfo: req.file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Start server
app.listen(port, () => {
  console.log('Server is running on http://localhost:3000');
});
