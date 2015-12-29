module.exports = [
  'CandidateModel',
  '$routeParams',
  function(CandidateModel, $routeParams) {
    this.displayform = false;
    this.save = () => {
      this.displayform = false;
    };
    let promise = CandidateModel.get({id: $routeParams.id}).$promise;

    this.comments = [
      {
        id: 1,
        comment: 'good candidate has 6 years of exp and a scrum master',
        author: 'Jim Pat'
      },
      {
        id: 1,
        comment: 'good candidate has 6 years of exp and a scrum master',
        author: 'Jim Pat'
      },
      {
        id: 1,
        comment: 'good candidate has 6 years of exp and a scrum master',
        author: 'Jim Pat'
      },
      {
        id: 1,
        comment: 'good candidate has 6 years of exp and a scrum master',
        author: 'Jim Pat'
      }
    ];

    promise.then((data) => {
      console.log(data);

    }, () => {
      $location.path('/not-found');
    });
  }];
