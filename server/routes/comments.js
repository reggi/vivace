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
    type: Joi.string().required(),
    body: Joi.string().required(),
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

function appendAuthor(req, res, next) {
  req.user.author = getPrimaryEmail(req.user.emails);
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

class Comments {
  constructor() {
    this.router = express.Router({ mergeParams: true });
    this.router.get('/', this.getAll);
    this.router.get('/:commentId', this.getById);
    this.router.post('/', jsonParser, validateBody, appendAuthor, this.add);
  }

  getAll(req, res) {
    CommentModel
      .findAll({
        where: {
          candidateId: req.params.candidateId
        }
      })
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
    let newComment = req.body;
    newComment.author = req.user.author;
    newComment.candidateId = req.params.candidateId;

    CommentModel
      .create(newComment)
      .then((result) => {
        return res
          .status(201)
          .json(result);
      });
  }
}

module.exports = new Comments();
