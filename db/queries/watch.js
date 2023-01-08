const db = require('../connection');

const getWatch = () => {
  return db.query('SELECT * FROM tasks WHERE category = watch;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
