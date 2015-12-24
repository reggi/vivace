let firetemplate = require('./template.html');

module.exports = function() {
 return{
   restrict: 'E',
   scope: {user: '=user'},
   templateUrl: firetemplate,
   link: (scope, element) => {
     
     scope.display = true;

     element.find('img')[0].onerror = function() {

       scope.$apply(function() {
         scope.display = false;
       });

     };

   }
 };
};