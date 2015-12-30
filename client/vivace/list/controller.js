module.exports = [
  'DataModel',
  '$location',
  function(DataModel, $location) {
    let promise = DataModel.query({collection: 'candidates'}).$promise;

    promise.then((data) => {
      this.users = data;
    }, () => {
      $location.path('/not-found');
    });
  }];

