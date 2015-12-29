let template = require('./template.html');

module.exports = () => {
 return {
   restrict: 'E',
   scope: {user: '=user'},
   templateUrl: template,
   link: (scope, element) => {

     scope.display = true;

     element
      .find('img')[0]
      .onerror = () => {

       scope.$apply(() => {
         scope.display = false;
       });

     };

   }
 };
};