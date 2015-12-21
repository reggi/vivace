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

  _storeObjectAtKey(model, flatObj, id) {
    let multi = this.client.multi();
    let flatModelSchema = flat.flatten(model.schema);

    let key = model.getKey(id);
    let indexKey = model.getKey("index");

    multi.hset(indexKey, id, key);
    for (let attributeName in flatModelSchema) {
      if(flatObj[attributeName]) {
        multi.hset(key, attributeName, flatObj[attributeName]);
      }
    }
    return multi.execAsync();
  }

  add(model, obj) {
    let flatObj;

    return this.client.incrAsync(model.getKey("counter")).then((counter)=> {
      obj.id = counter;
      flatObj = flat.flatten(obj);
      return this._storeObjectAtKey(model, flatObj, counter)
    });
  }

  update(model, id, obj) {
    let flatObj = flat.flatten(obj);
    return this.client.getAsync(model.getKey("counter")).then((counter)=> {
      if(parseInt(id, 10) > parseInt(counter, 10)) {
        return null;
      }

      return this._storeObjectAtKey(model, flatObj, id)
    });
  }

  get(model, id) {
    return this.client.hgetallAsync(model.getKey(id));
  }

  getAll(model) {
    return this.client.hgetallAsync(model.getKey("index")).then((keys) => {
      if(keys) {
        let multi = this.client.multi();

        for (let index in keys) {
          if(keys.hasOwnProperty(index)) {
            multi.hgetall(keys[index]);
          }
        }
        return multi.execAsync().then((result) => {
          return flat.unflatten(result);
        });
      } else {
          return [];
      }
    });
  }
}

module.exports = DbHelper;
