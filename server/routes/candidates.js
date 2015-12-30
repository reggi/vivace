import express from 'express';
import bodyParser from 'body-parser';
import Joi from 'joi';

import CandidateModel from '../models/CandidateModel';

let jsonParser = bodyParser.json({limit: '5mb'});

let candidateModel = {
  name: 'candidates',
  version: '1',
  schema: {
    id: Joi.number().integer().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    summary: Joi.string().optional(),
    avatar: Joi.string().optional(),
    createdAt: Joi.any().optional(),
    updatedAt: Joi.any().optional(),
    phone: Joi.any().optional(),
    email: Joi.any().optional()
  },

  isValid(body) {
    if (!body) {
      return false;
    }
    return Joi.validate(body, this.schema).error;
  }
};


const MUTABLE_FIELDS = ['firstName', 'lastName', 'summary', 'avatar', 'email', 'phone'];

function validateBody(req, res, next) {
  if (req.body.avatar === null) {
    delete req.body.avatar;
  }

  var bodyError = candidateModel.isValid(req.body);
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
    this.router.put('/:id', jsonParser, validateBody, this.update);
    this.router.post('/', jsonParser, validateBody, this.add);
  }

  getAll(req, res) {
    return CandidateModel.findAll().then((result) => {
      res.json(result);
      res.end();
    },
    (err) => {
      console.error(err.stack);
      res.status(500).send('unable to complete request ');
      res.end();
    });
  }

  getById(req, res) {
    return CandidateModel.findOne({where: {id: req.params.id}}).then((result) => {
      if(!result)  {
        res.status(404);
        return res.end();
      }

      res.json(result);
      return res.end();
    });
  }

  add(req, res) {
    let newCandidate = req.body;

    return CandidateModel.create(newCandidate).then((result) => {
      res.status(201).json(result);
      return res.end();
    });
  }

  update(req, res) {
    let updatedFields = req.body;

    return CandidateModel.update(updatedFields, {
      fields : MUTABLE_FIELDS,
      where: {id: req.params.id},
      returning: true
    }).then((result) => {
      res.json(result);
      res.end();
      return result;
    }, (err) => {
      res.status(404).end('Could not find candidate with id of ' + req.params.id);
      return err;
    });
  }
}

module.exports = new Candidates();
