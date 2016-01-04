import session from 'express-session';
import config from './config';
import connectRedis from 'connect-redis';
import connectSessionSequelize from 'connect-session-sequelize'
import dbConnection from './models/_connection'

let sessionConf = {
  secret: process.env.SESSION_SECRET || 'get smarter',
  resave: false,
  saveUninitialized: false
};

if (config.redis_url) {
  const RedisStore = connectRedis(session);
  sessionConf.store = new RedisStore({
    prefix: 'vivace.sess:',
    url: config.redis_url
  });
} else {
  const SequelizeStore = connectSessionSequelize(session.Store);
  sessionConf.store = new SequelizeStore({
    db: dbConnection
  });
  sessionConf.store.sync();
}

module.exports = session(sessionConf);
