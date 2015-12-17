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

describe('Candidate API', () => {
  beforeEach(() => {
    DbHelper = proxyquire('../../server/helper/database', {
      'redis': redis_mock
    });

    DbHelper.prototype.getAll = (model) => {
      return {
        then(callback) {   
          callback(mockGetAll);
        }
      };
    };
    candidates = proxyquire('../../server/routes/candidates', {
      '../helper/database': DbHelper
    });
  });

  describe('should serve an array of candidates on /', () => {
      let request, response, data;
      beforeEach(()=> {
        request  = httpMocks.createRequest({
          method: 'GET',
          url: '/api/candidates'
        });
        response = httpMocks.createResponse();

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
  })
})
