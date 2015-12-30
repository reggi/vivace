module.exports = [
  '$location',
  'DataModel',
  '$routeParams',
  function($location, DataModel, $routeParams) {

    let promise = DataModel.get({
      id: $routeParams.id,
      collection: 'candidates'
    }).$promise;

    promise.then((data) => {
      this.user = data;
      this.user.name = data.firstName + ' ' + data.lastName;
    }, () => {
      $location.path('/not-found');
    });
  }];
