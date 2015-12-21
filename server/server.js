import express from 'express';
import fs from 'fs';
import path from 'path';


import apiRouter from './routes';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  let webpackConfig = require('../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  let config = webpackConfig;

  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: '/client'
  }));


} else {
  app.use('/client', express.static(path.join(__dirname, '../dist')))
}

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../client/index.html'), (err, info) => {
    res.type('html');
    res.end(info);
  });
});

let listener = app.listen(process.env.PORT || 8001, () => {
  console.log('\x1b[33m%s:\x1b[4m%s\x1b[0m', 'App is listening on port', listener.address().port);
});

//Registering our routes
app.use('/api', apiRouter);

module.exports = app;
