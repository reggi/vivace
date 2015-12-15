/**
 * Created by jimit on 12/15/15.
 */
const chai =  require('chai');


describe('the vivace list controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('irCandidateDetails'));
  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../../client/vivace/details/controller'));
  }));

  it('should not be null for user', () => {
    chai.expect(ctrl.user).not.to.be.null;
  });

});
