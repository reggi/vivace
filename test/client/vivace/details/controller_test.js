const chai =  require('chai');
const expect = chai.expect;

describe('the vivace details controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('irVivaceModels'));
  beforeEach(angular.mock.module('irCandidateDetails'));

  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../../client/vivace/details/controller'));
  }));

  it('should not be null for user', () => {
   expect(ctrl.user).not.to.be.null;
  });

});
