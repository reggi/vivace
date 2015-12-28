var webpack = require('webpack');
var path = require('path');
var nodeModulesDir = path.join(__dirname, '../node_modules');

var config = {
  devtool: 'eval',
  entry: {
    app: './client/index.js',
    vendor: [
      'angular',
      'angular-sanitize',
      'angular-aria',
      'angular-animate',
      'angular-resource',
      'angular-material',
      'angular-route',
      'angular-messages',
      'ng-file-upload'
    ]
  },
  output: {
    filename: 'application.bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: nodeModulesDir}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel-loader!eslint-loader', exclude: nodeModulesDir}, // keep node modules out of here or it gets really slow.
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.html$/, loader: 'ngtemplate!html-loader', exclude: nodeModulesDir},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.DefinePlugin({'DATA_SOURCE_URL': process.env.DATA_SOURCE_URL || "'/api'"})
  ]
};


module.exports = config;
