/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const cookieSession = require('cookie-session');
const router = require('express').Router();

router.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.post('/', (req, res) => {
  let username = req.body.username;
  req.session = [username];
  res.redirect('/');
});

module.exports = router;