module.exports = function($location, dataStoreService, $routeParams) {
  this.user = dataStoreService.get($routeParams.id);
  if(!this.user) {
    $location.path('/not-found'); // TODO: make error page
  }
};
