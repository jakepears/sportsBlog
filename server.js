const express = require('express');
const path = require('path');
const app = express();
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home');
});
// // Set the Content-Type header for all CSS files
// app.use(
//   '/css',
//   express.static(path.join(__dirname, 'public', 'css'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//       }
//     },
//   })
// );

app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
