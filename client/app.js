import angular from 'angular';

export default angular.module('irVivace', [
  require('angular-route'),
  require('angular-sanitize'),
  require('./filters'),
  require('./candidateList')
]);
