import angular from 'angular';

angular
  .module('irVivaceModels', [require('angular-resource')])
  .factory('CandidateModel', require('./candidateModel'))
  .factory('BlobConversion', require('./blobConversion'));

module.exports = 'irVivaceModels';
