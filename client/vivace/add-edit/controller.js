
module.exports = [
  'regexProvider',
  '$location',
  '$routeParams',
  'CandidateModel',
  'BlobConversion',
  function(regexProvider, $location, $routeParams, CandidateModel, BlobConversion) {

    let promise;

    this.defaultAvatar = 'http://i.imgur.com/AnSoiBG.png';
    this.regex = regexProvider;
    this.details = {};

    if($routeParams.id !== 'new') {
      this.heading = 'Update Candidate';
      this.details = CandidateModel.get({id: $routeParams.id});
    } else {
      this.heading = 'Add Candidate';
    }

    this.save = () => {
      if($routeParams.id !== 'new') {
        promise = CandidateModel.update({id: this.details.id}, this.details).$promise;
      } else {
        this.details.lastContact = new Date();
        promise = CandidateModel.save(this.details).$promise;
      }
      promise.then((data) => {
        $location.path('/details/' + data.id);
      }, () => {
        $location.path('/not-found');
      });
    };

    this.uploadImage = (files) => {
      if(files && files.length) {
        BlobConversion
          .convert(files[0].$ngfBlobUrl, files[0].name)
          .then((base64Data) => {
            this.details.image = base64Data;
          });
      }
    };

  }];
