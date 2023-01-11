const db = require('../connection');
const categorize = require('../../public/scripts/helpers');

const getTasks = () => {
  return db.query('SELECT * FROM tasks;')
    .then(data => {
      return data.rows;
    });
};

const addTasks = (taskInfo) => {
  // let category = categorize(taskInfo.name);
  if (taskInfo.date === '') {
    taskInfo.date = null;
  }
  console.log(`string:`, taskInfo.date);
  console.log(typeof taskInfo.date);
  return db.query(`INSERT INTO tasks (name, category, due_date, completed, priority, users_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;`, [taskInfo.name, 'category', taskInfo.date, false, taskInfo.priority, 1]);
};

module.exports = { getTasks, addTasks };
