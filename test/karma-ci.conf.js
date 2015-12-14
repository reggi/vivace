var webpack = require("webpack");
var path = require('path');
var nodeModulesDir = path.join(__dirname, '../node_modules');

module.exports = function(config) {
  config.set({

    files: [
      '../node_modules/phantomjs-polyfill/bind-polyfill.js',
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'test.js'
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      'test.js': ['webpack'],
      '**/*_test.js': ['babel']
    },

    babelPreprocessor: {
      "presets": [
        "es2015",
        "stage-2"
      ]
    },

    reporters: ['spec', 'coverage', 'coveralls'],

    coverageReporter: {
      type: 'lcovonly',
      dir: './coverage/',
      subdir: '.'
    },

    webpack: {
      // webpack configuration
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel-loader', exclude: nodeModulesDir},
          {test: /\.css$/, loader: "style!css"},
          { test: /\.html$/, loader: 'ngtemplate!html-loader'}
        ],
        postLoaders: [{
          test: /\.js/,
          exclude: /(test|node_modules|bower_components)/,
          loader: 'isparta'
        }],
      },
      externals: {
        'angular': 'window.angular'
      },
      resolve: {
        modulesDirectories: [
          "",
          "",
          "node_modules"
        ]
      }
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      noInfo: true,
      devtool: 'eval'
    },

    plugins: [
      require("karma-webpack"),
      require("isparta-loader"),
      require("karma-mocha"),
      require("karma-coverage"),
      require('karma-coveralls'),
      require("karma-phantomjs-launcher"),
      require("karma-spec-reporter"),
      require('karma-babel-preprocessor')
    ],

    browsers: ['PhantomJS']
  });
};
