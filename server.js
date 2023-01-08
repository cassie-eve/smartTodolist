// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const templateVars = {
    username: req.cookies.session
  };
  res.render('index', templateVars);
});

//checking what displays on the given user routes
app.get('/users', (req, res) => {
  res.render('users');
});

app.get('/api/users', (req, res) => {
  res.render(res);
});

app.get('api/widgets', (req, res) => {
  res.render(res);
});

app.get('/login', (req, res) => {
  const templateVars = {
    username: req.cookies.session
  };
  res.render('login', templateVars);
});

app.get('/logout', (req, res) => {
  res.render('logout');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
