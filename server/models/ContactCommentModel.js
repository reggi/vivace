import Sql from 'sequelize';
import db from './_connection';

module.exports = db.define('contact_comment', {
  id : {
    type: Sql.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  type: {
    type: Sql.STRING,
    allowNull: false,
    defaultValue: 'contact',
    validate: {
      isIn: ['contact', 'server']
    }
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

