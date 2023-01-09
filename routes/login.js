const cookieSession = require('cookie-session');
const router = require('express').Router();
const {getUser, addUser }  = require('../db/queries/users');

router.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.post('/', (req, res) => {
  let username = req.body.username;
  getUser(username).then((result) => {
    if (!result) {
      addUser(username, req.body.password);
    }
    req.session.username = [username];
    res.redirect('/');
  });
});

module.exports = router;
