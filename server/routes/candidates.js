import express from 'express';
import DbHelper from '../helper/database';
import faker from 'faker';
import bodyParser from 'body-parser';

const candidateModel = {
  name: "candidates",
  version: "1",
  schema: {
    firstName: "",
    lastName: "",
    shortDescription: "",
    avatar: "",
    comments: [],
    lastContact: ""
  },
  getKey(id = "") {
    return this.name + "_" + this.version + ":" + id
  }
};

let candidate = express.Router();
let db = new DbHelper();
let jsonParser = bodyParser.json();

candidate.get('/', (req, res) => {
  db.getAll(candidateModel).then((result) => {
    res.json(result);
  });
});

candidate.get('/:id', (req, res) => {
  db.get(candidateModel, req.params.id).then((result) => {
    if(result) {
      res.json(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

candidate.put('/:id', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400).end();

  var updatedFields = req.body;

  db.update(candidateModel, req.params.id, updatedFields).then((result) => {
    if(result) {
      res.status(204);
    } else {
      res.status(404);
    }
    res.end();
  });
});

candidate.post('/', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400).end();

  var newCandidate = req.body;
  db.add(candidateModel, newCandidate).then((result) => {
    res.status(201).end();
  });
});

candidate.post('/populate', (req, res) => {
  let fake_user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    shortDescription: faker.lorem.sentence(),
    avatar: faker.internet.avatar(),
    comments: [],
    lastContact: faker.date.past()
  };

  db.add(candidateModel, fake_user).then((result) => {
    res.send(fake_user);
  });

});

module.exports = candidate;
