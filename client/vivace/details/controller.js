module.exports = function($location, CandidateModel, $routeParams) {

  this.user = CandidateModel.get({id: $routeParams.id});
  console.log(this.user);
  /*promise.then((data) => {
    this.user = data;
    this.user.name = data.firstName + ' ' + data.lastName;
  }, () => {
    $location.path('/not-found');
  });*/
};
