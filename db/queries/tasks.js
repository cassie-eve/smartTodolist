const db = require('../connection');
const { categorize } = require('../../public/scripts/helpers');

//CREATE
const addTasks = (taskInfo) => {
  return categorize(taskInfo.name).then(category => {
    if (!taskInfo.date) {
      taskInfo.date = null;
    }
    return db.query(`INSERT INTO tasks (name, category, due_date, completed, priority, users_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`, [taskInfo.name, category, taskInfo.date, false, taskInfo.priority, 1]);
  });
};

//READ
const getTasks = () => {
  return db.query('SELECT * FROM tasks ORDER BY id DESC;')
    .then(data => {
      return data.rows;
    });
};

//UPDATE

//DELETE
const deleteTask = (id) => {
  return db.query('DELETE FROM tasks WHERE id = $1;',[id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks, addTasks, deleteTask };
