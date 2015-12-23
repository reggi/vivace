import express from 'express';
import DbHelper from '../helper/database';
import bodyParser from 'body-parser';
import Joi from 'joi';


let db = new DbHelper();
let jsonParser = bodyParser.json();

let candidateModel = {
  name: 'candidates',
  version: '1',
  schema: {
    id: Joi.number().integer().optional(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    shortDescription: Joi.string().required(),
    avatar: Joi.string().optional(),
    comments: Joi.array().optional(),
    lastContact: Joi.string().optional()
  },
  getKey(id = "") {
    return this.name + "_" + this.version + ":" + id
  },
  isValid(body) {
    var validityFlag = true;
    if (!body) {
      validityFlag = false;
    } else if (Joi.validate(body, this.schema).error) {
      validityFlag = false;
    }
    return validityFlag;
  }
};

class Candidates {
  constructor() {

    this.router = express.Router();
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', jsonParser, this.update);
    this.router.post('/', jsonParser, this.add);
    if (process.env.NODE_ENV !== 'production') {
      this.router.post('/populate', this.populate);
    }
  }

  getAll(req, res) {
    db.getAll(candidateModel).then((result) => {
      res.json(result);
      res.end();
      return;
    });
  }

  getById(req, res) {
    db.get(candidateModel, req.params.id).then((result) => {
      if(!result)  {
        res.status(404);
        return res.end();
      }

      res.json(result);
      return res.end();
    });
  }

  add(req, res) {
    if (!candidateModel.isValid(req.body)) {
      res.sendStatus(400);
      res.end();
      return;
    }

    let newCandidate = req.body;

    db.add(candidateModel, newCandidate).then((result) => {
      res.json(result);
      res.status(201);
      res.end();
      return;
    });
  }

  update(req, res) {
    if (!candidateModel.isValid(req.body)) {
      res.sendStatus(400);
      res.end();
      return;
    }

    let updatedFields = req.body;

    db.update(candidateModel, req.params.id, updatedFields).then((result) => {
      if(!result)  {
        res.sendStatus(404);
        res.end();
        return;
      }

      res.json(result);
      res.status(204)
      res.end();
      return;
    });
  }

  populate(req, res) {
    let faker = require('faker');
    let fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      shortDescription: faker.lorem.sentence(),
      avatar: faker.internet.avatar(),
      comments: [],
      lastContact: faker.date.past()
    };

    db.add(candidateModel, fakeUser).then(() => {
      res.send(fakeUser);
    });
  }
}

module.exports = new Candidates();
