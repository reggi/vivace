var Sequelize = require('sequelize');
var path = require('path');

var dbPath = path.normalize(path.join(__dirname, '../../dev/database.db'));

module.exports = new Sequelize('sqlite://' + dbPath, undefined, undefined, {
  dialect: 'sqlite',
  storage: dbPath
});