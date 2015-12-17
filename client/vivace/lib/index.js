import angular from 'angular';

angular
  .module('irVivaceModels', [require('angular-resource')])
  .factory('CandidateModel', require('./candidateModel'));

module.exports = 'irVivaceModels';
