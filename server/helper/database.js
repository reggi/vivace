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

  _storeObjectAtKey(model, obj) {
    let multi = this.client.multi();
    let flatObj = flat.flatten(obj);
    let flatModelSchema = flat.flatten(model.schema);

    let key = model.getKey(obj.id);
    let indexKey = model.getKey('index');

    multi.hset(indexKey, obj.id, key);
    for (let attributeName in flatModelSchema) {
      if(flatObj[attributeName] !== undefined) {
        multi.hset(key, attributeName, flatObj[attributeName]);
      }
    }
    return multi.execAsync().then(() => {
        return obj;
    });
  }

  add(model, obj) {
    return this.client.incrAsync(model.getKey('counter')).then((counter)=> {
      obj.id = counter;
      return this._storeObjectAtKey(model, obj);
    });
  }

  update(model, id, obj) {
    let flatObj = flat.flatten(obj);
    return this.client.getAsync(model.getKey("counter")).then((counter)=> {
      if(parseInt(id, 10) > parseInt(counter, 10)) {
        return null;
      }

      obj.id = id;
      return this._storeObjectAtKey(model, obj);
    });
  }

  get(model, id) {
    return this.client.hgetallAsync(model.getKey(id));
  }

  getAll(model) {
    return this.client.hgetallAsync(model.getKey('index')).then((keys) => {
      if(!keys) {
        return [];
      }
      let multi = this.client.multi();

      for (let index in keys) {
        if(keys.hasOwnProperty(index)) {
          multi.hgetall(keys[index]);
        }
      }
      return multi.execAsync().then((result) => {
        return flat.unflatten(result);
      });
    });
  }
}

module.exports = DbHelper;
