const db = require('../connection');
const tasks = require('./tasks');
const users = require('./users');

const watch = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

const eat = () => {
  return db.query('SELECT * FROM tasks WHERE category = eat;')
    .then(data => {
      return data.rows;
    });
};

const read = () => {
  return db.query('SELECT * FROM tasks WHERE category = read;')
    .then(data => {
      return data.rows;
    });
};

const buy = () => {
  return db.query('SELECT * FROM tasks WHERE category = buy;')
    .then(data => {
      return data.rows;
    });
};

const completed = () => {
  return db.query('SELECT * FROM tasks WHERE completed = true;')
  .then(data => {
    return data.rows;
  });
}

const pending = () => {
  return db.query('SELECT * FROM tasks WHERE completed = false;')
  .then(data => {
    return data.rows;
  });
}

const all = () => {
  return db.query('SELECT * FROM tasks;')
  .then(data => {
    return data.rows;
  });
}

module.exports = { watch, eat, read, buy, completed, pending, all };
