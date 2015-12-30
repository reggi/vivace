module.exports = [
  'DataModel',
  '$routeParams',
  function(DataModel, $routeParams) {
    let routeData = {
      collection: 'candidates',
      subCollection: 'comments',
      id: $routeParams.id
    };

    this.newComment = {
      author: 'josh?',
      comment: ''
    };

    this.saveComment = () => {
      DataModel.save(routeData)
        .$promise
        .then((data) => {
          newComment = Object.assign(newComment, data);
        });
    };

    this.comments = [
      {
        id: 1,
        comment: 'good candidate has 6 years of exp and a scrum master',
        author: 'Jim Pat',
        createdAt: 1451490558
      },
      {
        id: 2,
        comment: 'yo dis a comment',
        author: 'Jo Sho',
        createdAt: 1451490558
      }
    ];

    DataModel
      .get(routeData)
      .$promise
      .then((data) => {
        this.comments = data;
        console.log('comments data: ', data);
      }, () => {
        console.log('NOT FOUND');
        //$location.path('/not-found');
      });
  }];
