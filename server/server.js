import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';

import webpackConfig from '../webpack.config';

const app = express();


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

app.listen(8001, () => {
  console.log('app is listening on port 8001');
});
