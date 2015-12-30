'use strict';
/*global DATA_SOURCE_URL */
// Value is provided by webpack config. See define plugin
const DATA_URL = DATA_SOURCE_URL;

module.exports = [
  '$resource',
  ($resource) => {
    return $resource(
      `${DATA_URL}/:collection/:id/:subCollection/:subId`,
      {id: '@_id'},
      {update: {method: 'PUT'}}
    );
  }];
