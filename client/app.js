import angular from 'angular';
import './static/main.css';
import 'angular-material/angular-material.css';

export default angular.module('irVivace', [
  require('angular-route'),
  require('angular-sanitize'),
  require('./filters'),
  require('./vivace/list'),
  require('./vivace/add-edit'),
  require('./vivace/details'),
  require('./vivace/not-found'),
  require('./vivace/image-dir')
]);
