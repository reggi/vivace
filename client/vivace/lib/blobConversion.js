'use strict';
/**
 * Converts a blob reference to base64 data
 */
module.exports = [
  '$http',
  ($http) => {
    let convert;
    let getUrlExtension;
    let toBase64;
    let renderDataUrl;
    let renderDataPrefix;

    getUrlExtension = (fileName) => {
      return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
    };

    toBase64 = (data) => {
      return new Buffer(data, 'binary').toString('base64');
    };

    renderDataPrefix = (fileExt) => {
      return 'data:image/' + fileExt + ';base64,';
    };

    renderDataUrl = (blobData, fileName) => {
      return renderDataPrefix(getUrlExtension(fileName)) + toBase64(blobData);
    };

    convert = (blobUrl, fileName) => {
      return new Promise((resolve) => {
        $http
          .get(blobUrl, {
            responseType: 'arraybuffer'
          })
          .then((result) => {
            resolve(renderDataUrl(result.data, fileName));
          });
      });
    };
    return {convert};
  }];