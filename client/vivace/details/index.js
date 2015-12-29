import angular from 'angular';
import routes from './routes';

angular.module('irCandidateDetails', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route'),
  require('../not-found'),
  require('../lib')
])
.controller('candidateDetailsController', require('./controller'))
.provider('candidateDetailsConfig', require('./configurationProvider'))

.config([
  '$routeProvider',
  'candidateDetailsConfigProvider',
  function($routeProvider, candidateDetailsConfigProvider) {
    const routePrefix = candidateDetailsConfigProvider.routePrefix;

    routes.forEach((route) => {
      $routeProvider.when(routePrefix + route.path, route);
    });
  }]);

module.exports = 'irCandidateDetails';
