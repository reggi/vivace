import Sql from 'sequelize';
import db from './_connection';

module.exports = db.define('comment', {
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

  timestamp: {
    type: Sql.DATE,
    allowNull: false,
    defaultValue: Sql.NOW
  },

  body: {
    type: Sql.TEXT
  }
});

