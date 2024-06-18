const express = require('express');
const sequelize = require('./config/config');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const hbs = require('express-handlebars');
const bcrypt = require('bcrypt');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const articleRoutes = require('./controllers/articleRoute');
const postRoutes = require('./controllers/api/postRoutes');

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

app.use('/article', articleRoutes);
app.use('/posts', postRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Start server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing models:', err);
  });
