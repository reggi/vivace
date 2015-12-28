require('babel-core/register');

var conn = require('../server/models/_connection');
var CandidateModel = require('../server/models/CandidateModel');


conn.sync().then(function() {
  console.log('Database created');
  process.exit();
}, function(err) {
  console.error(err);
  process.exit(1);
});