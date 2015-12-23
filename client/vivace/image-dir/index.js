import angular from 'angular';

angular.module('irCandidateImage', [
  require('angular-aria'),
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-material'),
  require('angular-route')
])

.directive('fallbackSrc', require('./directive'));

module.exports = 'irCandidateImage';
