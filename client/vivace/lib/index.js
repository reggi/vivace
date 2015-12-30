import angular from 'angular';

angular
  .module('irVivaceModels', [require('angular-resource')])
  .factory('DataModel', require('./dataModel'));

module.exports = 'irVivaceModels';
