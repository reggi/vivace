'use strict';
/**
 * Converts a blob reference to base64 data
 */
module.exports = [
  '$http',
  ($http) => {
    let convert;

    convert = (blobUrl) => {
      return new Promise((resolve) => {
        $http
          .get(blobUrl)
          .then((result) => {
            resolve(new Buffer(result.data, 'binary').toString('base64'));
          });
      });
    };
    return {convert};
  }];