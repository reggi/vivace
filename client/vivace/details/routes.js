
module.exports = [
  {
    path: '/details/:id',
    templateUrl: require('./template.html'),
    controller: 'candidateDetailsController',
    controllerAs: 'details',
    resolve: []
  }
];
