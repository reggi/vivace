import Sql from 'sequelize';
import db from './_connection';

let model = db.define('comment', {
  id : {
    type: Sql.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  type: {
    type: Sql.ENUM,
    values: ['contact', 'server'],
    allowNull: false,
    defaultValue: 'contact'
  },

  author: {
    type: Sql.STRING,
    allowNull: false
  },

  body: {
    type: Sql.TEXT
  }
});

export default model;
