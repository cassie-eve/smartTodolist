const db = require('../connection');
// const categorize = require('../../public/scripts/helpers');
let tiny = require('tiny-json-http');

// categorize a string as 'To Watch', 'To Eat', 'To Read', or 'To Buy'
const categorize = function(string) {
  let url = 'https://api.uclassify.com/v1/cassandraeve/smarttodolist/classify';
  let data = {"texts":[string]};
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token YDEFqA9byG5i'
  };

  // eslint-disable-next-line func-names
  tiny.post({url, data, headers}, function _posted(err, result) {
    if (err) {
      console.log('Error:', err);
    } else {
      let category = '';
      let score = 0;
      for (let name of result.body[0].classification) {
        if (name.p > score) {
          category = name.className;
          score = name.p;
        }
      }
      console.log(category);
      return category;
    }
  });
};

const getTasks = () => {
  return db.query('SELECT * FROM tasks;')
    .then(data => {
      return data.rows;
    });
};

const addTasks = (taskInfo) => {
  // let category = categorize(category);
  // console.log(category);
  if (!taskInfo.date) {
    taskInfo.date = null;
  }
  return db.query(`INSERT INTO tasks (name, category, due_date, completed, priority, users_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;`, [taskInfo.name, 'category', taskInfo.date, false, taskInfo.priority, 1]);
};

module.exports = { getTasks, addTasks };
