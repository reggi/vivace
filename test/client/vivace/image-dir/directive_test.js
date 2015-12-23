const chai =  require('chai');
const expect = chai.expect;

describe('the vivace image-dir controller', () => {
  let $rootScope,
      $element;
  let $compile,
      scope,
      element;

  beforeEach(angular.mock.module('irVivaceModels'));
  beforeEach(angular.mock.module('irCandidateImage'));

  beforeEach(angular.mock.inject((_$rootScope_, _$compile_) => {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;

    $rootScope.user = {
      "id": "1",
      "firstName": "Kasey",
      "lastName": "Adams",
      "shortDescription": "Voluptate aut et et sit omnis saepe.",
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/bolzanmarco/128.jpg",
      "comments": "",
      "lastContact": "Thu Nov 19 2015 22:18:09 GMT-0500 (EST)"
    };

    $element = angular.element("<fallback-src user='user'></fallback-src>");

    element = $compile($element)(scope);
    $rootScope.$apply();

  }));

  it('should be true for image to display', () => {

    let isolateScope = $element.isolateScope();

    expect(isolateScope.display).to.be.true;

  });

  it('should have img tag with attribute ng-show', () => {

   expect(element[0].querySelector('img').hasAttribute('ng-show')).to.be.true;

  });

  it('should have div tag with attribute ng-hide', () => {

    expect(element[0].querySelector('div div').hasAttribute('ng-hide')).to.be.true;

  });

});
