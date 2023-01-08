/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const router = require('express').Router();

router.post('/', (req, res) => {
  res.redirect('/');
});

module.exports = router;
