import angular from 'angular';

angular.module('irCandidateComments', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route')
])

.directive('comments', require('./directive'));

module.exports = 'irCandidateComments';
