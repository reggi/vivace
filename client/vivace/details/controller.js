module.exports = function($location, CandidateModel, $routeParams) {
  //this.user = CandidateModel.get($routeParams.id);
  this.user = {};
  if(!this.user) {
    $location.path('/not-found'); // TODO: make error page
  }
};
