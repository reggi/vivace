/**
 * Created by jimit on 12/15/15.
 */
/**
 * Created by jimit on 12/15/15.
 */
const chai =  require('chai');


describe('the vivace list controller', () => {
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
    chai.expect(ctrl.heading).to.equal('Update Candidate');
  });

});
