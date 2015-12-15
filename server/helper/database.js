import redis from 'redis';
import flat from 'flat';
import bluebird from 'bluebird';

class DbHelper {

  constructor() {
    //Promisifying the redis library
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);

    this.client = redis.createClient("32768", "192.168.99.100");

    this.client.on('error', (err) => {
      console.log('Error ' + err);
    });
  }

  add(model, obj) {
    let flatObj = flat.flatten(obj);

    return this.client.incrAsync(model.getKey() + "_counter").then((counter)=> {
      const recordKey = model.getKey() + ":" + counter;
      let multi = this.client.multi();

      for (let attributeName in flatObj) {
        multi.hset(recordKey, attributeName, flatObj[attributeName]);
      }
      return multi.execAsync();
    });
  }

  getAll(model) {
    return this.client.keysAsync(model.getKey() + ":*").then((keys) => {
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
