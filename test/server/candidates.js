import should from 'chai';

import httpMocks from 'node-mocks-http';
import CandidateModel from '../../server/models/CandidateModel';
import db from '../../server/models/_connection';

let candidates;

let candidateArray;
let mockGetAll;
let mockGet;
let mockPost;
let mockPut;


describe('Candidate API', () => {
  beforeEach(() => {

    candidates = require('../../server/routes/candidates');
    candidateArray = [ 
      {
        "firstName": "Lauretta",
        "lastName": "Barton",
        "shortDescription": "Est temporibus debitis est et.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg"
      },
      {
        "shortDescription": "Et eos impedit odio error.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg",
        "lastName": "Frami",
        "firstName": "Bertram"
      },
      {
        "firstName": "Jean",
        "lastName": "Cosby",
        "shortDescription": "Ut velit natus vel et itaque laboriosam qui est quia.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/dawidwu/128.jpg"
      }
    ];

    mockGetAll = candidateArray;
    mockGet = candidateArray[0];
    mockPost = candidateArray[0];
    mockPut = candidateArray[1];

    return db.sync({force: true}).then(function() {
      return CandidateModel.bulkCreate(candidateArray);
    });
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

      it('returns 200', () => {
        return candidates.getAll(request, response).then(function () {
          return response.statusCode.should.equal(200);
        })
      });

      it('returns JSON', () => {
        return candidates.getAll(request, response).then(function () {
          response._isJSON().should.be.ok;
        });
      });

      it('returns valid data', () => {
        return candidates.getAll(request, response).then(function () {
          return data = JSON.parse(response._getData());
        });
      });
  });

  describe('should serve a candidate on GET candidates/:id', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          params: {'id': 3},
          url: '/api/candidates/3'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 200', () => {
        return candidates.getById(request, response).then(function () {
          response.statusCode.should.equal(200);
        });
      });

      it('returns JSON', () => {
        return candidates.getById(request, response).then(function () {
          response._isJSON().should.be.ok;
        });
      });

      it('returns 404 on invalid id', () => {
        request.params.id = 4;
        function handler() {
          response.statusCode.should.equal(404);
          return response._isEndCalled().should.be.ok;
        }
        return candidates.getById(request, response)
          .then(handler, handler);
      });
  });

  // These are waiting for Prashant to hook up the test db
  describe('should update candidates via PUT candidates/:id', () => {
      let request, response;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          body: mockPut,
          method: 'PUT',
          url: '/api/candidates/2',
          params: {'id': 2}
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 204 on success', () => {
        return candidates.update(request, response).then(function() {
          response.statusCode.should.equal(204);
        });
      });


      it('returns 404 on failure', () => {
        delete mockPut.firstName;
        request  = httpMocks.createRequest({
          body: mockPut,
          method: 'PUT',
          url: '/api/candidates/4',
          params: {'id': 4}
        });
        return candidates.update(request, response).then(function() {
          response.statusCode.should.equal(404);
        }, function() {
          response.statusCode.should.equal(404);
        })
      });
  });

  describe('should add a candidate via POST candidates/', () => {
      let request, response;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          body: mockPost,
          method: 'POST',
          url: '/api/candidates'
        });
        request.user = {email: 'test@email.com'};
        response = httpMocks.createResponse();
      });

      it('returns 201 on success', () => {
        return candidates.add(request, response).then(function () {
          response.statusCode.should.equal(201);
        })
      });

      it('ends successfully', () => {
        return candidates.add(request, response).then(function () {
          response._isEndCalled().should.be.ok;
        })
      });
  });
});
