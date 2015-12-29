const chai =  require('chai');
const avatar = require('../../../../client/static/img/avatar.png');
const expect = chai.expect;

describe('the vivace add-edit controller', () => {
  let ctrl,
      scope,
      routeParams;
  beforeEach(angular.mock.module('irCandidateAddEdit'));
  beforeEach(angular.mock.module);
  beforeEach(angular.mock.module('ngFileUpload'));
  beforeEach(angular.mock.inject(($controller, $rootScope, $routeParams) => {
      ctrl = $controller(require('../../../../client/vivace/add-edit/controller'));
      ctrl.details.avatar = avatar;
      scope = $rootScope.$new();
      routeParams = $routeParams;
    }
  ))

  it('should not be update candidate for heading', () => {
    routeParams.id = 123;
    expect(ctrl.heading).to.equal('Update Candidate');
  });

  it('should update the avatar for the candidate', () => {
    expect(ctrl.details.avatar).to.not.be.null;
    expect(ctrl.details.avatar).to.have.length.above(32);
    expect(ctrl.details.avatar).to.contain('data:image/');
    expect(ctrl.details.avatar).to.contain(';base64,');
  });

});
