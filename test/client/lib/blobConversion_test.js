const chai = require('chai');
const chaiSubset = require('chai-subset');
const faker = require('faker');
const expect = chai.expect;

let BlobConversion;
let $httpBackend;

describe('Blob Conversion', () => {

  beforeEach(() => {
    angular.mock.module('irVivaceModels');
  });

  beforeEach(angular.mock.inject(function(_BlobConversion_, _$httpBackend_){
    BlobConversion = _BlobConversion_;
    $httpBackend = _$httpBackend_;
  }));

  it('should convert an image to a base64 url', (done) => {
    const blobUrl = 'blob:http://localhost:8001/riogfjoer-32492jdifj2-dsa8384je';
    const blobData = 'foobar';
    const base64Data = new Buffer(blobData).toString('base64');
    const fileName = 'pic.jpg';

    $httpBackend
      .expectGET(`${blobUrl}`)
      .respond(blobData);

    BlobConversion
      .convert(blobUrl, fileName)
      .then((dataUrl) => {
        const expectedUrl = 'data:image/jpg;base64,' + base64Data;

        expect(dataUrl).to.equal(expectedUrl);

        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
        done();
      });
    $httpBackend.flush();
  });

});
