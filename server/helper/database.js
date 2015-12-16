import redis from 'redis';
import flat from 'flat';
import process from 'process';
import bluebird from 'bluebird';

class DbHelper {

  constructor() {
    //Promisifying the redis library
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);

    this.client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

    this.client.on('error', (err) => {
      console.log('Error ' + err);
    });
  }

  _storeObjectAtKey(model, flatObj, key) {
      let multi = this.client.multi();
      let flatModelSchema = flat.flatten(model.schema);

      for (let attributeName in flatModelSchema) {
        if(flatObj[attributeName]) {
          multi.hset(key, attributeName, flatObj[attributeName]);
        }
      }
      return multi.execAsync();
  }

  add(model, obj) {
    let flatObj = flat.flatten(obj);

    return this.client.incrAsync(model.getKey("counter")).then((counter)=> {
      const recordKey = model.getKey(counter);
      return this._storeObjectAtKey(model, flatObj, recordKey)
    });
  }

  update(model, id, obj) {
    let flatObj = flat.flatten(obj);
    return this.client.getAsync(model.getKey("counter")).then((counter)=> {
      if(id > counter) {
          return null;
      }

      const recordKey = model.getKey(id);
      return this._storeObjectAtKey(flatObj, obj, recordKey)
    });
  }

  get(model, id) {
    return this.client.hgetallAsync(model.getKey(id));
  }

  getAll(model) {
    return this.client.keysAsync(model.getKey() + "*").then((keys) => {
      let multi = this.client.multi();

      for (let recordKey of keys) {
          multi.hgetall(recordKey);
      }
      return multi.execAsync().then((result) => {
          return flat.unflatten(result);
      });
    });
  }
}

module.exports = DbHelper;
