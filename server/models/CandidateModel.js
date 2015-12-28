import Sql from 'sequelize';
import db from './_connection';

import ContactCommentModel from './ContactCommentModel';

var model = module.exports = db.define('candidate', {
  id : {
    type: Sql.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  firstName: {
    type: Sql.STRING,
    field: 'first_name',
    allowNull: false
  },

  lastName: {
    type: Sql.STRING,
    field: 'last_name'
  },

  summary: {
    type: Sql.TEXT
  },

  avatar: {
    type: Sql.TEXT
  }
});

model.hasMany(ContactCommentModel);