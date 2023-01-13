/*
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const router = require('express').Router();
const taskQueries = require('../db/queries/tasks');

//CRUD
//CREATE - POST /
router.post('/', (req, res) => {
  taskQueries.addTasks(req.body)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: err.message });
    });
});

//READ ALL - GET /
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

//READ ONE - GET /:id
//UPDATE - POST /:id/edit


//DELETE - POST /:id/delete
router.post('/:id/delete', (req, res) => {
  taskQueries.deleteTask(req.params.id)
  .then(data => {
    res.json({ data });
  })
  .catch(err => {
    console.log(err);
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
