const cookieSession = require('cookie-session');
const router = require('express').Router();

router.use(cookieSession({
  name: 'session',
  keys: ['secret'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

module.exports = router;
