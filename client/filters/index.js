import angular from 'angular';

angular.module('irFilters', [])
  .filter('reverse', require('./reverse'));

module.exports = 'irFilters';
