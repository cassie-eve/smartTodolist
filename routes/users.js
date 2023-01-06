/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

//set variable for router to users
const router = require('express').Router();

//get request for path /users + '/'
router.get('/', (req, res) => {
  res.render('users');
});

module.exports = router;


//this page is used for paths that start with /users, ex. /users/:id would be found here as a GET to '/:id'.
