var Sequelize = require('sequelize');
var path = require('path');


var dbPath = path.normalize(path.join(__dirname, '../../dev/database.db'));
var dbUrl = process.env.DATABASE_URL;


if (dbUrl) {
  module.exports = new Sequelize(dbUrl);
} else {
  module.exports = new Sequelize('sqlite://' + dbPath, undefined, undefined, {
    dialect: 'sqlite',
    storage: dbPath
  });
}
