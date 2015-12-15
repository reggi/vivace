import angular from 'angular';

angular
  .module('irCandidateLib', [])
  .factory('dataStoreService', require('./dataStoreService'));

module.exports = 'irCandidateLib';
