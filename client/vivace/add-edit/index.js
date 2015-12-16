import angular from 'angular';
import routes from './routes';

angular.module('irCandidateAddEdit', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route'),
  require('../lib'),
])
.controller('candidateAddEditController', require('./controller'))
.provider('candidateAddEditConfig', require('./configurationProvider'))
.factory('regexProvider', require('./regexProvider'))
.config(function($routeProvider, candidateAddEditConfigProvider) {
  const routePrefix = candidateAddEditConfigProvider.routePrefix;

  routes.forEach((route) => {
    $routeProvider.when(routePrefix + route.path, route);
  });
});

module.exports = 'irCandidateAddEdit';
