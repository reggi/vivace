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
      return DataModel.save(routeData, this.newComment)
        .$promise
        .then((data) => {
          this.newComment = {};
          this.showAddForm = false;
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
