import proxyquire from 'proxyquire';
import should from 'chai';

import redis_mock from 'fakeredis';
import httpMocks from 'node-mocks-http';


var DbHelper;

let candidates;

const candidateArray = [ 
  {
    "firstName": "Lauretta",
    "lastName": "Barton",
    "shortDescription": "Est temporibus debitis est et.",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg",
    "comments": "",
    "lastContact": "Wed Feb 04 2015 13:15:32 GMT-0500 (EST)"
  },
  {
    "shortDescription": "Et eos impedit odio error.",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg",
    "lastContact": "Thu May 14 2015 05:07:08 GMT-0400 (EDT)",
    "comments": "",
    "lastName": "Frami",
    "firstName": "Bertram"
  },
  {
    "firstName": "Jean",
    "lastName": "Cosby",
    "shortDescription": "Ut velit natus vel et itaque laboriosam qui est quia.",
    "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dawidwu/128.jpg",
    "comments": "",
    "lastContact": "Tue Aug 18 2015 08:52:34 GMT-0400 (EDT)"
  }
];

const mockGetAll = candidateArray;
const mockGet = candidateArray[0];

let createPromise = (returnVal) => {
    return () => {
      return {
          then(callback) {
              callback(returnVal);
          }
      };
    };
};

describe('Candidate API', () => {
  beforeEach(() => {
    DbHelper = proxyquire('../../server/helper/database', {
      'redis': redis_mock
    });

    candidates = proxyquire('../../server/routes/candidates', {
      '../helper/database': DbHelper
    });
  });

  describe('should serve candidates on GET candidates/', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          url: '/api/candidates'
        });
        response = httpMocks.createResponse();

        DbHelper.prototype.getAll = createPromise(mockGetAll);

        candidates.getAll(request, response);

        data = JSON.parse(response._getData());
      });

      it('returns 200', () => {
        response.statusCode.should.equal(200);
      });

      it('ends successfully', () => {
        response._isEndCalled().should.be.ok;
      });

      it('returns JSON', () => {
        response._isJSON().should.be.ok;
      });

      it('returns valid data', () => {
        data.should.be.eql(mockGetAll);
      });
  });

  describe('should serve a candidate on GET candidates/:id', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          url: '/api/candidates/4'
        });
        response = httpMocks.createResponse();

        DbHelper.prototype.get = createPromise(mockGet);

        candidates.getById(request, response);

        data = JSON.parse(response._getData());
      });

      it('returns 200', () => {
        response.statusCode.should.equal(200);
      });

      it('ends successfully', () => {
        response._isEndCalled().should.be.ok;
      });

      it('returns JSON', () => {
        response._isJSON().should.be.ok;
      });

      it('returns valid data', () => {
        data.should.be.eql(mockGet);
      });

      it('returns 404 on invalid id', () => {
        DbHelper.prototype.get = createPromise(null);

        candidates.getById(request, response);
        data = JSON.parse(response._getData());

        response.statusCode.should.equal(404);
        response._isEndCalled().should.be.ok;
      });
  });

  describe('should update candidates via PUT candidates/:id', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'PUT',
          url: '/api/candidates/3'
        });
        response = httpMocks.createResponse();

        DbHelper.prototype.update = createPromise(1);

        candidates.update(request, response);
      });

      it('returns 204 on success', () => {
        response.statusCode.should.equal(204);
      });

      it('ends successfully', () => {
        response._isEndCalled().should.be.ok;
      });

      it('returns 404 on failure', () => {
        DbHelper.prototype.update = createPromise(null);

        candidates.update(request, response);

        response.statusCode.should.equal(404);
        response._isEndCalled().should.be.ok;
      });
  });

  describe('should add a candidate via POST candidates/', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'POST',
          url: '/api/candidates'
        });
        response = httpMocks.createResponse();

        DbHelper.prototype.add = createPromise(1);

        candidates.add(request, response);
      });

      it('returns 201 on success', () => {
        response.statusCode.should.equal(201);
      });

      it('ends successfully', () => {
        response._isEndCalled().should.be.ok;
      });
  });
});
