const Sequelize = require('sequelize');
const path = require('path');


let dbPath = path.normalize(path.join(__dirname, '../../dev/database.db'));
const dbUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') {
  dbPath = path.normalize(path.join(__dirname, '../../dev/database_test.db'));
}

if (dbUrl) {
  module.exports = new Sequelize(dbUrl);
} else {
  module.exports = new Sequelize('sqlite://' + dbPath, undefined, undefined, {
    dialect: 'sqlite',
    storage: dbPath,
    logging: process.env.DISABLE_SQL_LOGGING ? false : undefined
  });
}
