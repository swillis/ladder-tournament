'use strict';

var angular = require('angular');

require('./controllers/ng-welcome-controller'); 

var app = angular.module('myApp', [
	'ngWelcomeCtrl'
]);