'use strict';

const faker = require('faker');
const fs = require('fs');

module.exports = function () {

  let collections = {
    candidates: []
  };

  let collectionName = 'candidates';

  /**
   * Returns a record with the given id.
   *
   * @param {Number}              recordId
   * @return {Promise<record>}
   */
  function get(recordId, collectionName) {
    return new Promise((resolve, reject) => {
      const result = collections[collectionName]
        .filter((record) => {
          if(record.$id === recordId) {
            return record;
          }
        });
      resolve(result);
    });
  }


  /**
   * Returns a list of records in the FIRE list.
   *
   * @return {Promise<Array>} array of records.
   */
  function all(collectionName) {
    return new Promise((resolve, reject) => {
      resolve([{}]);
    });
  }


  /**
   * Adds a record to the data store.
   *
   * @param  {record}  record
   * @return {Promise<record>}
   */
  function add(details, collectionName) {
    return new Promise((resolve, reject) => {
      details.$id = dataStoreService.generateId();
      collection.push(details);

      resolve(details);
    });
  }

  /**
   * Updates an existing record in data store.
   *
   * @param  {record}  record (requires _id field)
   * @return {Promise<record>}
   */
  function update(details, collectionName) {
    return new Promise((resolve, reject) => {
      let collection = collections[collectionName];

      collection.forEach((record) => {
        if(record.$id === collection.$id) {
          collection = record;
        }
      });

      resolve(collection);
    });
  }

  let exports = {all, add, get, update};

  exports.all = all;
  exports.add = add;
  exports.get = get;
  exports.update = update;

  return exports;
};
