import proxyquire from 'proxyquire';
import should from 'chai';

import httpMocks from 'node-mocks-http';


let CandidateModel;

let candidates;

let candidateArray;
let mockGetAll;
let mockGet;
let mockPost;
let mockPut;

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
    candidates = proxyquire('../../server/routes/candidates', {});
    candidateArray = [ 
      {
        "firstName": "Lauretta",
        "lastName": "Barton",
        "shortDescription": "Est temporibus debitis est et.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg",
        "comments": [],
        "lastContact": "Wed Feb 04 2015 13:15:32 GMT-0500 (EST)"
      },
      {
        "shortDescription": "Et eos impedit odio error.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg",
        "lastContact": "Thu May 14 2015 05:07:08 GMT-0400 (EDT)",
        "comments": [],
        "lastName": "Frami",
        "firstName": "Bertram"
      },
      {
        "firstName": "Jean",
        "lastName": "Cosby",
        "shortDescription": "Ut velit natus vel et itaque laboriosam qui est quia.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dawidwu/128.jpg",
        "comments": [],
        "lastContact": "Tue Aug 18 2015 08:52:34 GMT-0400 (EDT)"
      }
    ];

    mockGetAll = candidateArray;
    mockGet = candidateArray[0];
    mockPost = candidateArray[0];
    mockPut = candidateArray[0];
  });

  describe('should serve candidates on GET candidates/', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          url: '/api/candidates'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();

      });

      it('returns 200', (done) => {
        candidates.getAll(request, response).then(function () {
          response.statusCode.should.equal(200);
        }).finally(function () {
          done();
        });
      });

      it('ends successfully', (done) => {
        candidates.getAll(request, response).then(function () {
          response._isEndCalled().should.be.ok;
        }).finally(function () {
          done();
        });
      });

      it('returns JSON', (done) => {
        candidates.getAll(request, response).then(function () {
          response._isJSON().should.be.ok;
        }).finally(function () {
          done();
        });
      });

      it('returns valid data', (done) => {
        candidates.getAll(request, response).then(function () {
          data = JSON.parse(response._getData());
        }).finally(function () {
          done();
        });
      });
  });

  describe('should serve a candidate on GET candidates/:id', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          params: {'id': 4},
          url: '/api/candidates/4'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 200', (done) => {
        candidates.getById(request, response).then(function () {
          response.statusCode.should.equal(200);
          response._isEndCalled().should.be.ok;
        }).finally(function () {
          done();
        });
      });

      it('returns JSON', (done) => {
        candidates.getById(request, response).then(function () {
          response._isJSON().should.be.ok;
        }).finally(function () {
          done();
        });
      });

      it('returns 404 on invalid id', (done) => {
        candidates.getById(request, response).catch(function () {
          response.statusCode.should.equal(404);
          response._isEndCalled().should.be.ok;
        }).finally(function () {
          done();
        });
      });
  });

  // These are waiting for Prashant to hook up the test db
  /*describe('should update candidates via PUT candidates/:id', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          body: mockPut,
          method: 'PUT',
          url: '/api/candidates/2'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 204 on success', () => {
        return candidates.update(request, response).then(function () {
          response.statusCode.should.equal(204);
        });
      });

      it('ends successfully', () => {
        return candidates.update(request, response).then(function () {
          response._isEndCalled().should.be.ok;
        });
      });

      it('returns 404 on failure', () => {
        delete mockPut.firstName;
        request  = httpMocks.createRequest({
          body: mockPut,
          method: 'PUT',
          url: '/api/candidates/3'
        });
        return candidates.update(request, response).catch(function () {
          response.statusCode.should.equal(404);
          response._isEndCalled().should.be.ok;
        });
      });
  });*/

  describe('should add a candidate via POST candidates/', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          body: mockPost,
          method: 'POST',
          url: '/api/candidates'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 201 on success', (done) => {
        candidates.add(request, response).then(function () {
          response.statusCode.should.equal(201);
        }).finally(function () {
          done();
        });
      });

      it('ends successfully', (done) => {
        candidates.add(request, response).then(function () {
          response._isEndCalled().should.be.ok;
        }).finally(function () {
          done();
        });
      });
  });
});
