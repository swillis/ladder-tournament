'use strict';

var angular = require('angular');
require('angular-animate'); 

require('./controllers/plots.directive'); 
require('./controllers/plots.controller'); 

var app = angular.module('app', [
  'ngAnimate',
  'plotsComponentModule',
  'plotsControllerModule',
]);

function isSupportedBrowser() {
  var hasJSON = 'JSON' in window && 'parse' in JSON;
  var supportMode = location.search.match(/supportMode/);
  return hasJSON && !supportMode;
}

angular.element(document).ready(function setup() {
  // Only give decent browser a js experience
  if (isSupportedBrowser()) {
    // Bootstrap Angular
    angular.bootstrap(document, ['app']);
  }
});