import angular from 'angular';
import 'angular-material/angular-material.css';
import routes from './routes';

angular.module('prospectList', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route')
])
.controller('prospectListController', require('./controller'))
.provider('prospectListConfig', require('./configurationProvider'))

.config(function($routeProvider, prospectListConfigProvider) {
    const routePrefix = prospectListConfigProvider.routePrefix;

    routes.forEach((route) => {
      $routeProvider.when(routePrefix + route.path, route);
    });
});

module.exports = 'prospectList';
