

module.exports = function() {
  //this.user = dataStoreService.get($routeParams.id);
   this.user = {

   };
  if(!this.user) {
    $location.path('/not-found'); // TODO: make error page
  }
};
