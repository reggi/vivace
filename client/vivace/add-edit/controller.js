

module.exports = function(regexProvider, $location, $routeParams, dataStoreService) {
  this.regex = regexProvider;
  this.details = {};
  if($routeParams.id !== 'new') {
    this.heading = 'Update Candidate';
    this.details = {};
    /*this.save = function() {

     irCandidateService
     .update(this.details)
     .then(viewCandidate);

     };*/
  }else{
    this.heading = 'Add Candidate';
  }

};
