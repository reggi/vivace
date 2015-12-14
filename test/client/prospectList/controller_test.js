const chai =  require('chai');


describe('the prospectList controller', () => {
  let ctrl;
  beforeEach(angular.mock.module('prospectList'));
  beforeEach(angular.mock.inject($controller => {
    ctrl = $controller(require('../../../client/prospectList/controller'));
  }));

  it('should not be null', () => {
    chai.expect(ctrl).not.to.be.null;
  });

  it('should have a default status of red', () => {
    ctrl.status.should.equal('red');
  });
});
