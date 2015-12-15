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
  getKey() {
    return this.name + "_" + this.version
  }
};

let candidate = express.Router();
let db = new DbHelper();

candidate.get('/', function(req, res, next) {
  db.getAll(candidateModel).then((result) => {
    res.json(result);
  });
});

candidate.post('/populate', function (req, res, next) {
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
