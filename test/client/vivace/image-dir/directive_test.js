const chai =  require('chai');


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
      "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/128.jpg",
      "comments": "",
      "lastContact": "Thu Nov 19 2015 22:18:09 GMT-0500 (EST)"
    };

    $element = angular.element("<fallback-src user='user'></fallback-src>");

    element = $compile($element)(scope);
    $rootScope.$apply();

  }));

  it('should be true for display image', () => {
    let isolateScope = $element.isolateScope();

    chai.expect(isolateScope.display).to.be.true;
  });

});
