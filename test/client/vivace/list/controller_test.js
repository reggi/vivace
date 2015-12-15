const chai =  require('chai');


describe('the vivace list controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('irCandidateList'));
  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../../client/vivace/list/controller'));
  }));

  it('should not be null', () => {
    chai.expect(ctrl).not.to.be.null;
  });

});
