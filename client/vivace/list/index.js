import angular from 'angular';
import routes from './routes';

angular.module('irCandidateList', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route'),
  require('../lib')
])
.controller('candidateListController', require('./controller'))
.provider('candidateListConfig', require('./configurationProvider'))

.config([
  '$routeProvider',
  'candidateListConfigProvider',
  function($routeProvider, candidateListConfigProvider) {
    const routePrefix = candidateListConfigProvider.routePrefix;

    routes.forEach((route) => {
      $routeProvider.when(routePrefix + route.path, route);
    });
  }]);

module.exports = 'irCandidateList';
