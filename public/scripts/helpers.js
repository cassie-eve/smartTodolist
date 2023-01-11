let tiny = require('tiny-json-http');

// categorize a string as 'To Watch', 'To Eat', 'To Read', or 'To Buy'
const categorize = function(string) {
  let url = 'https://api.uclassify.com/v1/cassandraeve/smarttodolist/classify';
  let data = {"texts":[string]};
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token YDEFqA9byG5i'
  };
  return new Promise(function(resolve, reject) {
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
        resolve(category);
      }
    });
  });
};

module.exports = { categorize };
