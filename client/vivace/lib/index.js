import angular from 'angular';

angular
  .module('irDataStoreLib', [])
  .factory('dataStoreService', require('./dataStoreService'));

module.exports = 'irDataStoreLib';
