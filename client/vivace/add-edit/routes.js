
module.exports = [
  {
    path: '/add/:id',
    templateUrl: require('./template.html'),
    controller: 'candidateAddEditController',
    controllerAs: 'candidate',
    resolve: []
  }
];
