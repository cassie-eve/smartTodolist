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
const editTask = (taskInfo) => {
  return db.query(`UPDATE tasks SET name = $1, category = $2, due_date = $3, completed = $4, priority = $5, users_id = $6
    WHERE id = $7;`, [taskInfo.name, category, taskInfo.date, false, taskInfo.priority, 1, taskId])
  .then((data) => {data.rows[0]});
};

//DELETE
const deleteTask = (id) => {
  return db.query('DELETE FROM tasks WHERE id = $1;',[id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTasks, addTasks, deleteTask, editTask };
