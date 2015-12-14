import fs from 'fs';

describe('a fake test', () => {
  it('should be true', (done) => {
    setTimeout(() => {
      chai.expect(true).to.be.ok;
      done();
    }, 100)
  })
})
