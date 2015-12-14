import angular from 'angular';

export default angular.module('irProspects', [
  require('angular-route'),
  require('angular-sanitize'),
  require('./filters'),
  require('./prospectList')
]);
