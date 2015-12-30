module.exports = [
  'DataModel',
  '$routeParams',
  function(DataModel, $routeParams) {
    let routeData = {
      collection: 'candidates',
      subCollection: 'comments',
      id: $routeParams.id
    };

    this.newComment = {};

    this.saveComment = () => {
      this.newComment.type = 'contact';
      DataModel.save(routeData, this.newComment)
        .$promise
        .then((data) => {
          this.newComment = {};
          this.comments.push(data);
        });
    };

    DataModel
      .query(routeData)
      .$promise
      .then((data) => {
        this.comments = data;
        console.log('comments data: ', data);
      }, () => {
        console.log('NOT FOUND');
        //$location.path('/not-found');
      });
  }];
