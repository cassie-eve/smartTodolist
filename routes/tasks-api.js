/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const router = require('express').Router();
const taskQueries = require('../db/queries/tasks');

router.get('/', (req, res) => {
  taskQueries.getTasks()
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  taskQueries.addTasks(req.body)
    .then(data => {
      // console.log(data);
      res.json({ data });

    })
    .catch(err => {
      console.log(`DB QUERY FAILED`);
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
