const db = require('../connection');

const watch = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

const eat = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

const read = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

const buy = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { watch, eat, read, buy };
