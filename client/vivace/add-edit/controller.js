const avatar = require('../../static/img/avatar.png');

module.exports = [
  'regexProvider',
  '$location',
  '$routeParams',
  'DataModel',
  'Upload',
  function(regexProvider, $location, $routeParams, DataModel, Upload) {
    let routeData = {
      id: $routeParams.id,
      collection: 'candidates'
    };

    let promise;

    this.defaultAvatar = avatar;
    this.regex = regexProvider;
    this.details = {};

    if($routeParams.id !== 'new') {
      this.heading = 'Update Candidate';
      this.details = DataModel.get(routeData);
    } else {
      this.heading = 'Add Candidate';
    }

    this.save = () => {
      if($routeParams.id !== 'new') {
        promise = DataModel.update(routeData, this.details).$promise;
      } else {
        promise = DataModel.save(routeData, this.details).$promise;
      }

      promise.then((data) => {
        $location.path('/details/' + data.id);
      }, () => {
        $location.path('/not-found');
      });
    };

    this.uploadImage = (files) => {
      if(files && files.length) {
        Upload
          .base64DataUrl(files)
          .then((urls) => {
            this.details.avatar = urls[0];
          });
      }
    };

  }];
