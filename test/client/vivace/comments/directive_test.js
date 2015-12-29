const chai =  require('chai');
const expect = chai.expect;

describe('the vivace comments controller', () => {
  let $rootScope,
      $element;
  let $compile,
      ctrl,
      scope,
      element;

  beforeEach(angular.mock.module('irVivaceModels'));
  beforeEach(angular.mock.module('irCandidateComments'));

  beforeEach(angular.mock.inject((_$rootScope_, _$compile_,$controller, _$httpBackend_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    $element = angular.element("<comments id='display.user.id'></comments>");
    _$httpBackend_.when('GET').respond([]);
    ctrl = $controller(require('../../../../client/vivace/comments/controller'));
    element = $compile($element)(scope);
    $rootScope.$apply();

  }));

  it('should be false before the add comment is clicked', () => {

    expect(ctrl.displayform).to.be.false;

  });


  it('should have a tag with attribute ng-click', () => {

   expect(element[0].querySelector('a').hasAttribute('ng-click')).to.be.true;

  });

});
