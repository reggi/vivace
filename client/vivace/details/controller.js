module.exports = [
  '$location',
  'CandidateModel',
  '$routeParams',
  function($location, CandidateModel, $routeParams) {

    let promise = CandidateModel.get({id: $routeParams.id}).$promise;

    promise.then((data) => {
      this.user = data;
      this.user.name = data.firstName + ' ' + data.lastName;
    }, () => {
      $location.path('/not-found');
    });
  }];
