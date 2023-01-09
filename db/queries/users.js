const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUser = function(username) {
  return db
    .query('SELECT * FROM users WHERE username = $1', [username])
    .then((result => {
      if (!result.rows.length) {
        console.log(`null rows`);
        return null;
      }
      console.log(`SUCCESS! ${JSON.stringify(result.rows[0])}`);
      return result.rows[0];
    })

    );
};

const addUser = function(user, password) {
  console.log(`this is the user ${user}`);
  return db
    .query(`INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING *;`, [user, password])
    .then((result) => {
      if (!result.rows.length) {
        return null;
      }
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

module.exports = { getUsers, getUser, addUser };
