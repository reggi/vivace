'use strict';
/*global DATA_SOURCE_URL */
// Value is provided by webpack config. See define plugin
const DATA_URL = DATA_SOURCE_URL;

module.exports = [
  '$resource',
  function($resource) {
    return $resource(
      `${DATA_URL}/candidates/:id`,
      {id: '@_id'},
      {update: {method: 'PUT'}}
    );
  }];
