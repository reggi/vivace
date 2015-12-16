
var Promise = require('es6-promise').Promise;
var testsContext = require.context(".", true, /_test$/);
testsContext.keys().forEach(testsContext);
var chai =  require('chai');
chai.should();
require('./client/tests')
