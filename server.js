const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

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

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
