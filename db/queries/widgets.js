const db = require('../connection');

const getWidgets = () => {
  return db.query('SELECT * FROM widgets;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getWidgets };
