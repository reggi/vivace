let commentTemplate = require('./template.html');

module.exports = function() {
 return{
   restrict: 'E',
   scope: {id: '=id'},
   templateUrl: commentTemplate,
   controller: 'candidateComments',
   controllerAs: 'display'
 };
};