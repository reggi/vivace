const chai = require('chai');
const chaiSubset = require('chai-subset');
const faker = require('faker');

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
    angular.mock.module('irDataStoreLib');
  });

  beforeEach(angular.mock.inject(function(_dataStoreService_){
    dataStoreService = _dataStoreService_;
  }));

  it('should add a new record to the collection', (done) => {

    dataStoreService
      .add(dummy, 'candidates')
      .then((result) => {
        chai.expect(result).to.equal(dummy);
        done();
      });
  });

  it('should show the entire collection', (done) => {
    dataStoreService
      .add(dummy, 'candidates')
      .then(() => dataStoreService.all('candidates'))
      .then((result) => {
        chai.expect(result.length).to.equal(1);
        chai.expect(result[0]).to.equal(dummy);
        done();
      });
  });

  it('should show a specific record', (done) => {
    dataStoreService
      .add(dummy, 'candidates')
      .then((result) => dataStoreService.get(result.$id, 'candidates'))
      .then((result) => {
        chai.expect(result.length).to.equal(1);
        chai.expect(result[0]).to.equal(dummy);
        done();
      });
  });
  
  it('should update a specific record', (done) => {
    let updatedDummy;

    dataStoreService
      .add(dummy, 'candidates')
      .then((result) => {
        updatedDummy = result;
        updatedDummy.firstName = 'Thor';

        return dataStoreService.update(updatedDummy, 'candidates');
      })
      .then((result) => {
        chai.expect(result[0]).to.equal(updatedDummy);
        done();
      });
  });

});