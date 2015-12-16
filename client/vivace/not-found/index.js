import angular from 'angular';
import routes from './routes';

angular.module('notFound', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route')
])
.provider('notFoundConfig', require('./configurationProvider'))

.config(function($routeProvider, notFoundConfigProvider) {
  const routePrefix = notFoundConfigProvider.routePrefix;

  routes.forEach((route) => {
    $routeProvider.when(routePrefix + route.path, route);
  });
});

module.exports = 'notFound';
