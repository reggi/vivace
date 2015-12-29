var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var isStaging = process.env.BUILD_ENVIRONMENT;
var isProduction = process.argv[2] == '-p' && process.env.NODE_ENV == 'production' && !isStaging;


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
      {test: /\.js$/, loader: 'eslint-loader', exclude: /\/node_modules\//}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /\/node_modules\//}, // keep node modules out of here or it gets really slow.
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      {test: /\.html$/, loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname, './client/vivace') +'!html-loader', exclude: /\/node_modules\//},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new webpack.DefinePlugin({
      'DATA_SOURCE_URL': JSON.stringify(process.env.DATA_SOURCE_URL || '/api'),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ]
};

if (isStaging || isProduction) {
  config.devtool = undefined;
  config.module.preLoaders = undefined;
}

if (isProduction) {
  console.log('production mode enabled, running uglify');
  config.plugins= [new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    compress: true,
    verbose: true
  })].concat(config.plugins);
}




module.exports = config;
