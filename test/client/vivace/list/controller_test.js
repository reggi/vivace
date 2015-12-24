const chai =  require('chai');
const expect = chai.expect;

describe('the vivace list controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('irCandidateList'));
  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../../client/vivace/list/controller'));
  }));

  it('should not be null users', () => {
    expect(ctrl.users).not.to.be.null;
  });


});
