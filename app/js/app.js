'use strict';

// require('./directives/ng-example-directive');
// require('./controllers/ng-example-controller');

var angular = require('angular');

// angular.module('home', [
//   // 'ngExampleDirective',
//   // 'ngExampleCtrl'
// ]);

var NgWelcomeCtrl = require('./controllers/ng-welcome-controller'); // We can use our WelcomeCtrl.js as a module. Rainbows.

var app = angular.module('myApp', []);
app.controller('NgWelcomeCtrl', ['$scope', NgWelcomeCtrl]);