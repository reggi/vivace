import Sequelize from 'sequelize';
import path from 'path';

let dbPath = path.normalize(path.join(__dirname, '../../dev/database.db'));
let dbUrl = process.env.DATABASE_URL;

let dbOptions = {
  dialect: 'sqlite',
  storage: dbPath
};

let sequelize = (dbUrl) ? new Sequelize(dbUrl) : new Sequelize('sqlite://' + dbPath, undefined, undefined, dbOptions);

export default sequelize;
