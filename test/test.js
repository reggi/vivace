var testsContext = require.context("./client", true, /_test$/);
testsContext.keys().forEach(testsContext);
var chai =  require('chai');
chai.should();
require('./client/tests')
