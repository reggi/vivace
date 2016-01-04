import Sequelize from 'sequelize';
import path from 'path';

let dbPath = path.normalize(path.join(__dirname, '../../dev/database.db'));
const dbUrl = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') {
  dbPath = path.normalize(path.join(__dirname, '../../dev/database_test.db'));
}

let dbOptions = {
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.DISABLE_SQL_LOGGING ? false : undefined
};

let sequelize = (dbUrl) ? new Sequelize(dbUrl) : new Sequelize('sqlite://' + dbPath, undefined, undefined, dbOptions);

export default sequelize;
