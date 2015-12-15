const chai = require('chai');
const chaiSubset = require('chai-subset');
const faker = require('faker');
const fs = require('fs');

let mockWindow;
let dataStoreService;

const dummy = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  shortDescription: faker.lorem.sentence(),
  avatar: faker.internet.avatar(),
  comments: [],
  lastContact: faker.date.past()
};

describe('the reverse', () => {

  beforeEach(() => {
    angular.mock.module('irCandidateLib');
  });

  beforeEach(angular.mock.inject(function(_dataStoreService_){
    dataStoreService = _dataStoreService_;
  }));

  it('should add a new record to the collection', () => {
    dataStoreService
      .add(dummy, 'candidates')
      .then((result) => {
        chaiSubset.expect(result).to.containSubset(dummy);
      });
  });

  it('should show the entire collection', () => {
    dataStoreService
      .add(dummy)
      .then(() => dataStoreService.all('candidates'))
      .then((result) => {
        chai.expect(result.length).to.equal(1);
        chaiSubset.expect(result[0]).to.containSubset(dummy);
      });
  });

  it('should show a specific record', () => {
    dataStoreService
      .add(dummy)
      .then((result) => dataStoreService.get(result.$id, 'candidates'))
      .then((result) => {
        chai.expect(result).to.equal(1);
      });
  });
  
  it('should update a specific record', () => {
    let updatedDummy;

    dataStoreService
      .add(dummy)
      .then((result) => {
        updatedDummy = Object.assign(result, {firstName: 'Thor'});

        dataStoreService.update(updatedDummy, 'candidates');
      })
      .then((result) => {
        chaiSubset.expect(result).to.containSubset(updatedDummy);
      });
  });

});