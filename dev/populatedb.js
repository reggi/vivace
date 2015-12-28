require('babel-core/register');

var CandidateModel = require('../server/models/CandidateModel');

var genFakeData = require('./fakeData');

CandidateModel.bulkCreate(genFakeData()).then(function() {
  console.log('Populated db with additional candidates.');
  process.exit();
}, function(err) {
  console.error(err);
  process.exit(1);
});