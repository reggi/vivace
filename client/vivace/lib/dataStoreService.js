'use strict';

module.exports = function() {

  let collections = {
    candidates: []
  };

  /**
   * Returns a record with the given id.
   *
   * @param {Number}              recordId
   * @return {Promise<record>}
   */
  function get(recordId, collectionName) {
    return new Promise((resolve) => {
      let result;

      result = collections[collectionName]
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
    return new Promise((resolve) => {
      resolve(collections[collectionName]);
    });
  }

  /**
   * Adds a record to the data store.
   *
   * @param  {record}  record
   * @return {Promise<record>}
   */
  function add(details, collectionName) {
    return new Promise((resolve) => {
      details.$id = 1;
      collections[collectionName].push(details);

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
    return new Promise((resolve) => {
      let collection = collections[collectionName];

      collection.forEach((record) => {
        if(record.$id === collection.$id) {
          collection = record;
        }
      });

      resolve(collection);
    });
  }

  return {all, add, get, update};
};
