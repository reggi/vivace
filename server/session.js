import session from 'express-session';
import config from './config';


let sessionConf = {
  secret: process.env.SESSION_SECRET || 'get smarter',
  resave: false,
  saveUninitialized: false
};


if (config.redis_host) {
  const connectRedis = require('connect-redis');
  const RedisStore = connectRedis(session);
  sessionConf.store = new RedisStore({
    prefix: 'vivace.sess:',
    port: config.redis_port,
    host: config.redis_host
  });
} else {
  const SequelizeStore = require('connect-session-sequelize')(session.Store);
  const dbConnection = require('./models/_connection');

  sessionConf.store = new SequelizeStore({
    db: dbConnection
  });

  sessionConf.store.sync();
}

module.exports = session(sessionConf);