import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

import CommentModel from '../models/CommentModel';

let jsonParser = bodyParser.json();

let commentModel = {
  name: 'comments',
  version: '1',
  schema: {
    id: Joi.number().integer().optional(),
    comment: Joi.string().required(),
    author: Joi.string().required(),
    contactMethod: Joi.string().optional(),
    createdAt: Joi.any().optional()
  },

  isValid(body) {
    if (!body) {
      return false;
    }
    return Joi.validate(body, this.schema).error;
  }
};

function getPrimaryEmail(emails) {
  var email;
  for(var i=0; i<emails.length; i++) {
    if (emails[i].type === 'account') {
      email = emails[i].value;
    }
  }
  return email;
}

function appendUserEmail(req, res, next) {
  req.user.email = getPrimaryEmail(req.user.emails);
  next();
}

function validateBody(req, res, next) {
  if (req.body.avatar === null) {
    delete req.body.avatar;
  }

  var bodyError = commentModel.isValid(req.body);
  if (bodyError) {
    return res.status(400).end('bodyError :: ' + bodyError);
  }
  next();
}

class Candidates {
  constructor() {
    this.router = express.Router();
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
    this.router.post('/', jsonParser, validateBody, appendUserEmail, this.add);
  }

  getAll(req, res) {
    CommentModel
      .findAll()
      .then((result) => {
        return res.json(result);
      }, (err) => {
        return res
          .status(500)
          .send('unable to complete request ');
      });
  }

  getById(req, res) {
    CommentModel
      .findOne({where: {id: req.params.commentId}})
      .then((result) => {
        if(!result) {
          return res.status(404);
        }
        return res.json(result);
      });
  }

  add(req, res) {
    let newCandidate = req.body;

    CommentModel
      .create(newCandidate)
      .then((result) => {
        return res
          .status(201)
          .json(result);
      });
  }
}

module.exports = new Comments();