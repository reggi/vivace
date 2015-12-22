module.exports = function(CandidateModel, $location) {
  let promise = CandidateModel.query().$promise;

  promise.then((data) => {

    this.users = data;
  }, () => {
    $location.path('/not-found');
  });
};

