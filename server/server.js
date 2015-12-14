import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';


import apiRouter from './routes';

const app = express();
const port = process.env.PORT || 8001;

if (process.env.NODE_ENV !== 'production') {
  let webpackConfig = require('../webpack.config');
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

app.listen(port, () => {
  console.log('app is listening on port 8001');
});

//Registering our routes
app.use('/api', apiRouter);
