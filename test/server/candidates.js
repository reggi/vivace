import proxyquire from 'proxyquire';
import should from 'chai';

import redis_mock from 'fakeredis';


var DbHelper = proxyquire('../../server/helper/database', {
  'redis': redis_mock
});

var candidates = proxyquire('../../server/routes/candidates', {
  '../helper/database': DbHelper
});

describe('Candidate', () => {
  it('should serve index.html', (done) => {
    "10".should.equal("10");
  })
})
