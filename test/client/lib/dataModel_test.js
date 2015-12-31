const chai = require('chai');
const chaiSubset = require('chai-subset');
const faker = require('faker');
const expect = chai.expect;

// Global variable injectd by webpack.
const DATA_URL = DATA_SOURCE_URL;

let DataModel;
let $httpBackend;


const dummy = {
  id: 0,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  shortDescription: faker.lorem.sentence(),
  avatar: faker.internet.avatar(),
  comments: [],
  lastContact: faker.date.past()
};

describe('the Data Model', () => {

  beforeEach(() => {
    angular.mock.module('irVivaceModels');
  });

  beforeEach(angular.mock.inject((_DataModel_, _$httpBackend_) => {
    DataModel = _DataModel_;
    $httpBackend = _$httpBackend_;
  }));

  it('should make an http request to the proper endpoint', (done) => {
    $httpBackend.expectGET(`${DATA_URL}/candidates`)
      .respond([dummy]);

    DataModel
      .query({
        collection: 'candidates'
      })
      .$promise
      .then((res) => {
        expect(res).to.have.length(1);

        setTimeout(() => {
          $httpBackend.verifyNoOutstandingRequest();
          $httpBackend.verifyNoOutstandingExpectation();
          done();
        }, 10);
      });
      $httpBackend.flush();
    });

});
