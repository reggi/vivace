const chai =  require('chai');
const expect = chai.expect;

describe('the vivace comments controller', () => {
  let $rootScope,
      $element;
  let $compile,
      DataModel,
      ctrl,
      scope,
      element;

  beforeEach(angular.mock.module('irVivaceModels'));
  beforeEach(angular.mock.module('irCandidateComments'));

  beforeEach(angular.mock.inject((_$rootScope_, _$compile_,$controller, _DataModel_, _$httpBackend_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    DataModel = _DataModel_;
    $element = angular.element("<comments id='display.user.id'></comments>");
    _$httpBackend_.when('GET').respond([]);
    ctrl = $controller(require('../../../../client/vivace/comments/controller'));
    element = $compile($element)(scope);
    $rootScope.$apply();

  }));

  it('should be false the showAddForm variable after calling save function', () => {

    ctrl.showAddForm = true;
    ctrl
      .saveComment()
      .then(() => {
        expect(ctrl.comments).to.have.length.of.at.least(1);
        expect(ctrl.showAddForm).to.be.false;
      });

  });

});
