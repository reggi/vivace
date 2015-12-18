

module.exports = function(regexProvider, $location, $routeParams, CandidateModel) {

  let promise;

  this.regex = regexProvider;
  this.details = {};
  if($routeParams.id !== 'new') {
    this.heading = 'Update Candidate';
    this.details = {};
  }else{
    this.heading = 'Add Candidate';
  }
  this.save = () => {
    if($routeParams.id !== 'new') {
      promise = CandidateModel.update({id: this.details.id}, this.details).$promise;

      promise.then((data) => {
        $location.path('/details/' + data.id);
      }, () => {
        $location.path('/not-found');
      });

    }else{
      promise = CandidateModel.save().$promise;

      promise.then((data) => {
        $location.path('/details/' + data.id);
      }, () => {
        $location.path('/not-found');
      });
    }
  };

};
