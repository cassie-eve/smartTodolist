const db = require('../connection');

const getTasks = () => {
  return db.query('SELECT * FROM tasks;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks };
