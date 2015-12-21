import express from 'express';
import fs from 'fs';
import path from 'path';

import webpackConfig from '../webpack.config';

import apiRouter from './routes';

const app = express();
const port = process.env.PORT || 8001;

if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');

  let config = webpackConfig;

  let compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: '/'
  }));
}

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../client/index.html'), (err, info) => {
    res.type('html');
    res.end(info);
  });
});

let listener = app.listen(port, () => {
  console.log('\x1b[33m%s:\x1b[4m%s\x1b[0m', 'App is listening on port', listener.address().port);
});

//Registering our routes
app.use('/api', apiRouter);

module.exports = app;
