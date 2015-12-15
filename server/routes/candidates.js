import express from 'express';
import DbHelper from '../helper/database';
import faker from 'faker';

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

candidate.get('/', (req, res, next) => {
  db.getAll(candidateModel).then((result) => {
    res.json(result);
  });
});

candidate.get('/:id', (req, res, next) => {
  db.get(candidateModel, req.params.id).then((result) => {
    if(result) {
      res.json(result);
    } else {
      res.status(404);
    }
    res.end();
  });
});

candidate.post('/populate', (req, res, next) => {
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
