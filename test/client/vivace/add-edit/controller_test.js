const chai =  require('chai');
const expect = chai.expect;

describe('the vivace add-edit controller', () => {
  let ctrl,
      scope,
      routeParams;
  beforeEach(angular.mock.module('irCandidateAddEdit'));
  beforeEach(angular.mock.inject(($controller, $rootScope, $routeParams) => {
      ctrl = $controller(require('../../../../client/vivace/add-edit/controller'));
      scope = $rootScope.$new();
      routeParams = $routeParams;
    }
  ))

  it('should not be update candidate for heading', () => {
    routeParams.id = 123;
    expect(ctrl.heading).to.equal('Update Candidate');
  });

});
