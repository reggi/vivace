module.exports = function(dataStoreService) {
  this.users = dataStoreService.all('candidates');

};

