const chai =  require('chai');


describe('the candidateList controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('irCandidateList'));
  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../client/candidateList/controller'));
  }));

  it('should not be null', () => {
    chai.expect(ctrl).not.to.be.null;
  });

  it('should have a default status of red', () => {
    ctrl.status.should.equal('red');
  });
});
