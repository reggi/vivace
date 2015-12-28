import express from 'express';
<<<<<<< f9d6b9995e94a0001f46346f0b41bfc26ad3ea25
import DbHelper from '../helper/database';
import bodyParser from 'body-parser';
import Joi from 'joi';


let db = new DbHelper();
=======
import bodyParser from 'body-parser';
import Joi from 'joi';

import CandidateModel from '../models/CandidateModel';

//let db = new DbHelper();
>>>>>>> Switched server to use sequelize and sqlite3
let jsonParser = bodyParser.json();

let candidateModel = {
  name: 'candidates',
  version: '1',
  schema: {
    id: Joi.number().integer().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    summary: Joi.string().optional(),
    avatar: Joi.string().optional(),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional()
  },

  isValid(body) {
    if (!body) {
      return false;
    }
    return Joi.validate(body, this.schema).error;
  }
};


const MUTABLE_FIELDS = ['firstName', 'lastName', 'summary', 'avatar'];

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
    CandidateModel.findAll().then((result) => {
      res.json(result);
    },
    (err) => {
      console.error(err.stack);
      res.status(500).send('unable to complete request ');
    });
  }

  getById(req, res) {
    CandidateModel.findOne({where: {id: req.params.id}}).then((result) => {
      if(!result)  {
        res.status(404);
        return res.end();
      }

      res.json(result);
    });
  }

  add(req, res) {
    let newCandidate = req.body;

    CandidateModel.create(newCandidate).then((result) => {
      res.status(201).json(result);
    });
  }

  update(req, res) {
    let updatedFields = req.body;

    CandidateModel.update(updatedFields, {
      fields : MUTABLE_FIELDS,
      where: {id: req.params.id},
      returning: true
    }).then((result) => {
      res.status(204).json(result);
    }, (err) => {
      res.status(404).end('Could not find candidate with id of ' + req.params.id);
    });
  }
}

module.exports = new Candidates();
